package com.codestates.team5.dailyclub.apply.mapper;

import com.codestates.team5.dailyclub.apply.dto.ApplyDto;
import com.codestates.team5.dailyclub.apply.entity.Apply;
import com.codestates.team5.dailyclub.common.mapper.CommonMapper;
import org.mapstruct.Mapper;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface ApplyMapper extends CommonMapper {

    //Apply -> ApplyResponseDto
    default ApplyDto.Response applyToApplyResponseDto(Apply apply) {
        return ApplyDto.Response.builder()
                        .id(apply.getId())
                        .userId(apply.getUser().getId())
                        .programId(apply.getProgram().getId())
                        .build();
    }
}
