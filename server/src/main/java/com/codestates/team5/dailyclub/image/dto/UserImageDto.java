package com.codestates.team5.dailyclub.image.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class UserImageDto {
    @Schema(name = "유저 프로필 이미지 응답 API 스펙", title = "유저 프로필 이미지 이미지 응답 API 스펙")
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {

        @Schema(description = "프로그램 이미지 ID")
        private Long id;

        @Schema(description = "유저 ID")
        private Long userId;

        @Schema(description = "파일명")
        private String originalName;

        @Schema(title = "파일")
        private byte[] bytes;

        @Schema(description = "확장자")
        private String contentType;

        @Schema(description = "크기(byte)")
        private Long size;

    }
}


