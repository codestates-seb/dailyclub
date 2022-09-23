package com.codestates.team5.dailyclub.apply.mapper;

import com.codestates.team5.dailyclub.apply.dto.ApplyDto;
import com.codestates.team5.dailyclub.apply.entity.Apply;
import com.codestates.team5.dailyclub.common.mapper.CommonMapper;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface ApplyMapper extends CommonMapper {

    //Apply -> ApplyResponseDto
    default ApplyDto.Response applyToApplyResponseDto(Apply apply) {
        return ApplyDto.Response.builder()
                            .id(apply.getId())
                            .userId(apply.getUser().getId())
                            .programId(apply.getProgram().getId())
                            .createdTime(apply.getCreatedDate())
                            .build();
    }

    //Apply -> ApplyResponseWithUserDto
    default ApplyDto.ResponseWithUser applyToApplyResponseWithUserDto(Apply apply) {
        return ApplyDto.ResponseWithUser.builder()
                                    .id(apply.getId())
                                    .programId(apply.getProgram().getId())
                                    .user(userToUserResponseDto(apply.getUser()))
                                    .createdTime(apply.getCreatedDate())
                                    .build();
    }

    //ApplyList -> ApplyResponseWithUserDtoList
    default List<ApplyDto.ResponseWithUser> appliesToResponseWithUserDtos(List<Apply> applies) {
        return applies.stream()
                .map(this::applyToApplyResponseWithUserDto)
                .collect(Collectors.toList());
    }


    //Apply -> ApplyResponseWithProgramDto
    default ApplyDto.ResponseWithProgram applyToApplyResponseWithProgramDto(Apply apply) {
        return ApplyDto.ResponseWithProgram.builder()
                                    .id(apply.getId())
                                    .userId(apply.getUser().getId())
                                    .program(programToProgramResponseDto(apply.getProgram()))
                                    .createdTime(apply.getCreatedDate())
                                    .build();
    }

    //ApplyList -> ApplyResponseWithProgramDtoList
    default List<ApplyDto.ResponseWithProgram> appliesToResponseWithProgramDtos(List<Apply> applies) {
        return applies.stream()
                .map(this::applyToApplyResponseWithProgramDto)
                .collect(Collectors.toList());
    }
}
