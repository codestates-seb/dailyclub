package com.codestates.team5.dailyclub.program.mapper;

import com.codestates.team5.dailyclub.common.mapper.CommonMapper;
import com.codestates.team5.dailyclub.common.util.EnumValueConvertUtils;
import com.codestates.team5.dailyclub.program.dto.ProgramDto;
import com.codestates.team5.dailyclub.program.entity.Program;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface ProgramMapper extends CommonMapper {

    //ProgramPostDto -> Program
    default Program programPostDtoToProgram(ProgramDto.Post post) {
        return Program.builder()
            .title(post.getTitle())
            .text(post.getText())
            .numOfRecruits(post.getNumOfRecruits())
            .location(EnumValueConvertUtils.ofDescription(Program.Location.class, post.getLocation()))
            .programDate(post.getProgramDate())
            .minKind(post.getMinKind())
            .build();
    }

    //ProgramPatchDto -> Program
    default Program programPatchDtoToProgram(ProgramDto.Patch patch) {
        return Program.builder()
            .id(patch.getId())
            .title(patch.getTitle())
            .text(patch.getText())
            .numOfRecruits(patch.getNumOfRecruits())
            .location(EnumValueConvertUtils.ofDescription(Program.Location.class, patch.getLocation()))
            .programDate(patch.getProgramDate())
            .minKind(patch.getMinKind())
            .build();
    }

    //ProgramList -> ProgramResponseDtoList
    default List<ProgramDto.Response> programListToProgramResponseDtoList(List<Program> programList) {
        return programList.stream()
            .map(this::programToProgramResponseDto)
            .collect(Collectors.toList());
    }

}
