package com.codestates.team5.dailyclub.bookmark.mapper;

import com.codestates.team5.dailyclub.bookmark.dto.BookmarkDto;
import com.codestates.team5.dailyclub.bookmark.entity.Bookmark;
import com.codestates.team5.dailyclub.program.dto.ProgramDto;
import com.codestates.team5.dailyclub.program.entity.Program;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface BookmarkMapper {

    //북마크 등록시
    default BookmarkDto.Response bookmarkToResponseDto(Bookmark bookmark) {
        return BookmarkDto.Response.builder()
                .id(bookmark.getId())
                .programId(bookmark.getProgram().getId())
                .build();
    }

    default List<BookmarkDto.Response> bookmarkListToBookmarkResponseDtoList(List<Bookmark> bookmarkList) {
        return bookmarkList.stream()
                .map(this::bookmarkToResponseDto)
                .collect(Collectors.toList());
    }

    default BookmarkDto.ResponseWithProgram bookmarkToResponseDtoWithProgram(Bookmark bookmark) {
        return BookmarkDto.ResponseWithProgram.builder()
                .id(bookmark.getId())
                .program(programToProgramResponseDto(bookmark.getProgram()))
                .build();
    }

    default List<BookmarkDto.ResponseWithProgram> bookmarkListToBookmarkResponseDtoWithProgramList(List<Bookmark> bookmarkList) {
        return bookmarkList.stream()
                .map(this::bookmarkToResponseDtoWithProgram)
                .collect(Collectors.toList());
    }

    default ProgramDto.Response programToProgramResponseDto(Program program) {
        return ProgramDto.Response.builder()
                .id(program.getId())
                .title(program.getTitle())
                .build();
    }
}
