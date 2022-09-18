package com.codestates.team5.dailyclub.notice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

public class NoticeDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
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
    public static class Response {
        @Schema(description = "공지사항 ID", example = "1")
        private Long id;
        @Schema(description = "공지사항 ID", example = "1")
        private Long userId;
        @Schema(description = "제목", example = "공지사항 제목입니다.")
        private String title;
        @Schema(description = "본문", example = "공지사항 본문입니다.")
        private String text;
    }

}
