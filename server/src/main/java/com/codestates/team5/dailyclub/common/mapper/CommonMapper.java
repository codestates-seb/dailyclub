package com.codestates.team5.dailyclub.common.mapper;

import com.codestates.team5.dailyclub.common.util.EnumValueConvertUtils;
import com.codestates.team5.dailyclub.image.dto.ProgramImageDto;
import com.codestates.team5.dailyclub.image.entity.ProgramImage;
import com.codestates.team5.dailyclub.program.dto.ProgramDto;
import com.codestates.team5.dailyclub.program.entity.Program;

import java.util.stream.Collectors;

public interface CommonMapper {

    //Program -> ProgramResponseDTO
    default ProgramDto.Response programToProgramResponseDto(Program program) {
        return ProgramDto.Response.builder()
                .id(program.getId())
//                .writer(userToUserResponseDto(program.getUser()))
                .title(program.getTitle())
                .text(program.getText())
                .numOfRecruits(program.getNumOfRecruits())
                .location(EnumValueConvertUtils.toDescription(program.getLocation()))
                .programDate(program.getProgramDate())
                .programImages(program.getProgramImages().stream()
                                        .map(this::programImageToProgramImageResponseDto)
                                        .collect(Collectors.toList()))
                .minKind(program.getMinKind())
                .programStatus(EnumValueConvertUtils.toDescription(program.getProgramStatus()))
                .createdDate(program.getCreatedDate())
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

}
