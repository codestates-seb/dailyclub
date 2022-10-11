package com.codestates.team5.dailyclub.notification.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


public class NotificationDto {

    @Schema(name = "알림 응답 API 스펙", title = "알림 응답 API 스펙")
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        @Schema(description = "알림 ID")
        private Long id;

        @Schema(description = "유저 ID")
        private Long userId;

        @Schema(description = "프로그램 ID")
        private Long programId;

        @Schema(description = "프로그램 제목")
        private String title;

        @Schema(description = "열람 여부", allowableValues = {"READ", "UNREAD"})
        private String status;

        @Schema(description = "알림 타입", allowableValues = {"UPDATE", "DDAY", "APPLY_COMPLETE"})
        private String type;

        @Schema(description = "알림 시간", example = "2022-09-18 10:11:22", pattern = "yyyy-MM-dd HH:mm:ss", type = "string")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createdDate;
    }
}
