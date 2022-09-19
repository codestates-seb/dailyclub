package com.codestates.team5.dailyclub.message.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class MessageDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(name = "메세지 보내기 API 스펙", title = "메세지 보내기 API 스펙")
    public static class Post {
        @Schema(description = "받는 유저 ID", example = "hoho123")
        private String toUserId;
        @Schema(description = "받는 유저 닉네임", example = "멍멍")
        private String toUserNickname;
        @Schema(description = "메세지 내용", example = "메세지 내용입니다.")
        private String text;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(name = "메세지 response API 스펙", title = "메세지 response API 스펙")
    public static class Response {
        @Schema(description = "메세지 ID", example = "1")
        private Long id;
        @Schema(description = "유저 ID", example = "3")
        private Long userId;
        @Schema(description = "보낸 유저 닉네임", example = "냥냥")
        private String fromUserNickname;
        @Schema(description = "받는 유저 로그인 ID", example = "hoho123")
        private String toUserId;
        @Schema(description = "받는 유저 닉네임", example = "멍멍")
        private String toUserNickname;
        @Schema(description = "메세지 내용", example = "메세지 내용입니다.")
        private String text;
        @Schema(description = "읽음 표시", example = "UNREAD")
        private String readStatus;
        @Schema(description = "작성 날짜", example = "2022-08-31 12:31", type = "string")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern ="yyyy-MM-dd MM:mm",timezone = "Asia/Seoul")
        private LocalDateTime createdDate;
    }

}
