package com.codestates.team5.dailyclub.message.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MessageDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(name = "메세지 보내기 API 스펙", title = "메세지 보내기 API 스펙")
    public static class Post {
        @Schema(description = "보낸 user ID", example = "meow123")
        private Long fromUserId;
        @Schema(description = "받는 유저 ID", example = "hoho2345")
        private Long toUserId;
        @Schema(description = "메세지 내용", example = "메세지 내용입니다.")
        private String text;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(name = "메세지 response API 스펙", title = "메세지 response API 스펙")
    public static class Response {
        @Schema(description = "보낸 user ID", example = "meow123")
        private Long fromUserId;
        @Schema(description = "받는 유저 ID", example = "hoho2345")
        private Long toUserId;
        @Schema(description = "메세지 내용", example = "메세지 내용입니다.")
        private String text;
        @Schema(description = "읽음 표시", example = "F")
        private Character statusRead;
        @Schema(description = "보낸 날짜", example = "2022년 08월 31일")
        private String createdDate;
    }

}
