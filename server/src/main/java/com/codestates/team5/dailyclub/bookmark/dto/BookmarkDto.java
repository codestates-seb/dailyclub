package com.codestates.team5.dailyclub.bookmark.dto;

import com.codestates.team5.dailyclub.program.dto.ProgramDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class BookmarkDto {

    @Schema(name = "북마크 등록 요청 API 스펙", title = "북마크 등록 요청 API 스펙")
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Post {
        @Schema(description = "프로그램 ID", example = "5")
        private Long programId;
    }

    @Schema(name = "북마크 응답 API 스펙", title = "북마크 응답 API 스펙")
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        @Schema(description = "북마크 ID", example = "1")
        private Long id;

        @Schema(description = "프로그램 ID", example = "5")
        private Long programId;
    }

    @Schema(name = "북마크 응답 API 스펙 (프로그램 정보 포함)", title = "북마크 응답 API 스펙 (프로그램 정보 포함)")
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ResponseWithProgram {
        @Schema(description = "북마크 ID", example = "1")
        private Long id;
        @Schema(title = "프로그램")
        private ProgramDto.Response program;
    }
}
