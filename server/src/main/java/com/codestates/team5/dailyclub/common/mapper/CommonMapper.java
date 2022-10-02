package com.codestates.team5.dailyclub.common.mapper;

import com.codestates.team5.dailyclub.common.util.EnumValueConvertUtils;
import com.codestates.team5.dailyclub.image.dto.ProgramImageDto;
import com.codestates.team5.dailyclub.image.dto.UserImageDto;
import com.codestates.team5.dailyclub.image.entity.ProgramImage;
import com.codestates.team5.dailyclub.image.entity.UserImage;
import com.codestates.team5.dailyclub.program.dto.ProgramDto;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.user.dto.UserDto;
import com.codestates.team5.dailyclub.user.entity.User;

import java.util.stream.Collectors;

public interface CommonMapper {

    //User -> UserResponseDto
    default UserDto.Response userToUserResponseDto(User user) {
        return UserDto.Response.builder()
                .id(user.getId())
                .loginId(user.getLoginId())
                .introduction(user.getIntroduction())
                .kind(user.getKind())
                .nickname(user.getNickname())
                .role(user.getRole().getRole())
                .userImages(user.getUserImages().stream()
                        .map(this::userImageToUserImageResponseDto)
                        .collect(Collectors.toList()))
                .build();
    }

    //Program -> ProgramResponseDTO
    default ProgramDto.Response programToProgramResponseDto(Program program) {
        return ProgramDto.Response.builder()
                .id(program.getId())
                .writer(userToUserResponseDto(program.getUser()))
                .title(program.getTitle())
                .text(program.getText())
                .numOfRecruits(program.getNumOfRecruits())
                .location(EnumValueConvertUtils.toDescription(program.getLocation()))
                .programDate(program.getProgramDate())
                .minKind(program.getMinKind())
                .programStatus(EnumValueConvertUtils.toDescription(program.getProgramStatus()))
                .createdDate(program.getCreatedDate())
                .programImages(program.getProgramImages().stream()
                        .map(this::programImageToProgramImageResponseDto)
                        .collect(Collectors.toList()))
                .build();
    }

    //ProgramImage -> ProgramImageResponseDto
    default ProgramImageDto.Response programImageToProgramImageResponseDto(ProgramImage programImage) {
        return ProgramImageDto.Response.builder()
                .id(programImage.getId())
                .programId(programImage.getProgram().getId())
                .size(programImage.getSize())
                .contentType(programImage.getContentType())
                .originalName(programImage.getOriginalName())
                .bytes(programImage.getBytes())
                .build();
    }

    default UserImageDto.Response userImageToUserImageResponseDto(UserImage userImage) {
        return UserImageDto.Response.builder()
                .id(userImage.getId())
                .userId(userImage.getUser().getId())
                .size(userImage.getSize())
                .contentType(userImage.getContentType())
                .originalName(userImage.getOriginalName())
                .bytes(userImage.getBytes())
                .build();
    }

}
