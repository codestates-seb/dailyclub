package com.codestates.team5.dailyclub.notice.controller;

import com.codestates.team5.dailyclub.common.dto.MultiResponseDto;
import com.codestates.team5.dailyclub.notice.dto.NoticeDto;
import com.codestates.team5.dailyclub.notice.entity.Notice;
import com.codestates.team5.dailyclub.notice.mapper.NoticeMapper;
import com.codestates.team5.dailyclub.notice.service.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;
    private final NoticeMapper noticeMapper;


    @Operation(summary = "공지사항 등록")
    @ApiResponse(responseCode = "201", description = "CREATED", content = @Content(schema = @Schema(implementation = NoticeDto.Response.class)))
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postNotice(@RequestBody NoticeDto.Post requestBody ) {
        long userId = 1L;
        Notice notice = noticeMapper.noticePostToNotice(requestBody);
        Notice response = noticeService.createNotice(notice, userId);
        Notice responseDto = noticeMapper.noticeToNoticeResponseDto(response);

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @Operation(summary = "공지사항 수정")
    @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = NoticeDto.Response.class)))
    @PatchMapping(value = "/{noticeId}",  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> patchNotice(@RequestBody NoticeDto.Patch requestBody, @PathVariable("noticeId") long id) {
        long userId = 1L;
        Notice notice = noticeMapper.noticePatchToNotice(requestBody);
        Notice response = noticeService.updateNotice(notice, id, userId);
        Notice responseDto = noticeMapper.noticeToNoticeResponseDto(response);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @Operation(summary = "공지사항 하나 조회")
    @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = NoticeDto.Response.class)))
    @GetMapping(value = "/{noticeId}",  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNotice(@PathVariable("noticeId") long id) {
        Notice response = noticeService.findNotice(id);
        Notice responseDto = noticeMapper.noticeToNoticeResponseDto(response);
       return new ResponseEntity<>(responseDto, HttpStatus.OK);
   }


    @Operation(summary = "공지사항 리스트")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponse(responseCode = "200", description = "OK")
    public ResponseEntity<MultiResponseDto<NoticeDto.Response>> getNotices(@Parameter(description = "페이지 번호") @RequestParam int page,
                                                                           @Parameter(description = "한 페이지당 알림 수") @RequestParam int size) {
       Page<Notice> pageNotices = noticeService.findNotices(page - 1, size);
       List<Notice> notices = pageNotices.getContent();
       List<NoticeDto.Response> responseDtos = noticeMapper.NoticesToNoticeResponseDtos(notices);

       return new ResponseEntity<>(new MultiResponseDto<>(responseDtos), HttpStatus.OK);
   }

    @Operation(summary = "공지사항 삭제")
    @ApiResponse(responseCode = "204", description = "NO CONTENT")
    @DeleteMapping(value = "/{noticeId}",  produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteNotice (@PathVariable("noticeId") long id) {
        noticeService.deleteNotice(id);
   }


}
