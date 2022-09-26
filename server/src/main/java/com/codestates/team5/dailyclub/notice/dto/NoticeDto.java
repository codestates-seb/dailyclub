package com.codestates.team5.dailyclub.notice.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

public class NoticeDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(name = "공지사항 등록 API 스펙", title = "공지사항 등록 API 스펙")
    public static class Post{
        @Schema(description = "제목", example = "공지사항 제목입니다.")
        private String title;
        @Schema(description = "본문", example = "공지사항 본문입니다.")
        private String text;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(name = "공지사항 수정 API 스펙", title = "공지사항 수정 API 스펙")
    public static class Patch{
        @Schema(description = "공지사항 ID", example = "1")
        private Long id;
        @Schema(description = "제목", example = "공지사항 제목입니다.")
        private String title;
        @Schema(description = "본문", example = "공지사항 본문입니다.")
        private String text;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(name = "공지사항 response API 스펙", title = "공지사항 response API 스펙")
    public static class Response {
        @Schema(description = "공지사항 ID", example = "1")
        private Long id;
        @Schema(description = "유저 ID", example = "3")
        private Long userId;
        @Schema(description = "제목", example = "공지사항 제목입니다.")
        private String title;
        @Schema(description = "본문", example = "공지사항 본문입니다.")
        private String text;
        @Schema(description = "보낸 날짜", example = "2022-08-31 12:31", type = "string")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern ="yyyy-MM-dd MM:mm",timezone = "Asia/Seoul")
        private LocalDateTime createdDate;
    }

}
