package com.codestates.team5.dailyclub.bookmark.mapper;

import com.codestates.team5.dailyclub.bookmark.dto.BookmarkDto;
import com.codestates.team5.dailyclub.bookmark.entity.Bookmark;
import com.codestates.team5.dailyclub.common.mapper.CommonMapper;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface BookmarkMapper extends CommonMapper {

    //북마크 등록시
    default BookmarkDto.Response bookmarkToResponseDto(Bookmark bookmark) {
        return BookmarkDto.Response.builder()
                .id(bookmark.getId())
                .userId(bookmark.getUser().getId())
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

}
