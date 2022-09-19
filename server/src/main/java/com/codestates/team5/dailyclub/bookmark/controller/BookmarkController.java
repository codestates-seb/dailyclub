package com.codestates.team5.dailyclub.bookmark.controller;

import com.codestates.team5.dailyclub.bookmark.dto.BookmarkDto;
import com.codestates.team5.dailyclub.bookmark.entity.Bookmark;
import com.codestates.team5.dailyclub.bookmark.mapper.BookmarkMapper;
import com.codestates.team5.dailyclub.bookmark.service.BookmarkService;
import com.codestates.team5.dailyclub.common.dto.MultiResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "북마크 API")
@Slf4j
@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;
    private final BookmarkMapper bookmarkMapper;

    @Operation(summary = "북마크 등록")
    @ApiResponses(
        @ApiResponse(
            responseCode = "201",
            description = "CREATED"
        )
    )
    @PostMapping()
    public ResponseEntity<BookmarkDto.Response> postBookmark(@RequestBody BookmarkDto.Post bookmarkPostDto) {
        Long loginUserId = 1L;
        Bookmark bookmark
                = bookmarkService.createBookmark(loginUserId, bookmarkPostDto.getProgramId());
        BookmarkDto.Response responseDto
                = bookmarkMapper.bookmarkToResponseDto(bookmark);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @Operation(summary = "북마크 리스트 조회")
    @ApiResponses(
        @ApiResponse(
            responseCode = "200",
            description = "OK"
        )
    )
    @GetMapping
    public ResponseEntity<MultiResponseDto<BookmarkDto.ResponseWithProgram>> getBookmarks(@Parameter(description = "페이지 번호") @RequestParam int page,
                                                                                          @Parameter(description = "한 페이지당 북마크 수") @RequestParam int size) {
        Long loginUserId = 1L;
        Page<Bookmark> pageBookmarks
                = bookmarkService.findBookmarks(page-1, size, loginUserId);
        List<Bookmark> bookmarks = pageBookmarks.getContent();
        List<BookmarkDto.ResponseWithProgram> responseWithProgramList
                = bookmarkMapper.bookmarkListToBookmarkResponseDtoWithProgramList(bookmarks);
        return new ResponseEntity<>(new MultiResponseDto<>(responseWithProgramList, pageBookmarks), HttpStatus.OK);
    }

    @Operation(summary = "북마크 삭제")
    @ApiResponses(
        @ApiResponse(
            responseCode = "204",
            description = "NO CONTENT"
        )
    )
    @DeleteMapping("/{bookmarkId}")
    public void deleteBookmark(@PathVariable("bookmarkId") Long id) {
        bookmarkService.deleteBookmark(id);
    }

}
