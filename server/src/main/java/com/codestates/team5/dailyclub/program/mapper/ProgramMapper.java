package com.codestates.team5.dailyclub.program.mapper;

import com.codestates.team5.dailyclub.location.entity.Location;
import com.codestates.team5.dailyclub.program.dto.ProgramDto;
import com.codestates.team5.dailyclub.program.entity.Program;
import org.mapstruct.Mapper;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface ProgramMapper {

    default Program programPostDtoToProgram(ProgramDto.Post post, Long loginUserId) {
        return Program.builder()
                .title(post.getTitle())
                .text(post.getText())
                .numApply(post.getNumApply())
                .location(Location.builder().id(post.getLocationId()).build())
                .programDate(post.getProgramDate())
                .minKind(post.getMinKind())
                .build();
    }

    default ProgramDto.Response programToProgramResponseDto(Program program) {
        return ProgramDto.Response.builder()
                .id(program.getId())
                .title(program.getTitle())
                .build();
    }

    default List<ProgramDto.Response> programListToProgramResponseDtoList(List<Program> programs) {
        return null;
    }

}
