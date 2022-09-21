package com.codestates.team5.dailyclub.image.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ProgramImageDto {

    @Schema(name = "프로그램 이미지 응답 API 스펙", title = "프로그램 이미지 응답 API 스펙")
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {

        @Schema(description = "프로그램 이미지 ID")
        private Long id;

        @Schema(description = "프로그램 ID")
        private Long programId;

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
