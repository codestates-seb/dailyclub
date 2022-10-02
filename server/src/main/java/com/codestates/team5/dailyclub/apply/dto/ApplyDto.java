package com.codestates.team5.dailyclub.apply.dto;

import com.codestates.team5.dailyclub.program.dto.ProgramDto;
import com.codestates.team5.dailyclub.user.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class ApplyDto {

    @Schema(name = "프로그램 신청 요청 API 스펙", title = "프로그램 신청 요청 API 스펙")
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Post {
        @Schema(description = "신청 프로그램 ID", example = "1")
        @NotNull
        private Long programId;
    }

    @Schema(name = "프로그램 신청 응답 API 스펙", title = "프로그램 신청 응답 API 스펙")
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        @Schema(description = "신청 ID", example = "1")
        private Long id;

        @Schema(description = "신청 유저 ID", example = "1")
        private Long userId;

        @Schema(description = "신청 프로그램 ID", example = "1")
        private Long programId;

        @Schema(description = "신청 시간", example = "2022-09-18 10:11:22", pattern = "yyyy-MM-dd HH:mm:ss", type = "string")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createdTime;
    }

    @Schema(name = "프로그램 신청 응답 API 스펙 (유저 정보 포함)", title = "프로그램 신청 응답 API 스펙 (유저 정보 포함)")
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ResponseWithUser {
        @Schema(description = "신청 ID", example = "1")
        private Long id;

        @Schema(description = "신청 프로그램 ID", example = "1")
        private Long programId;

        private UserDto.Response user;

        @Schema(description = "신청 시간", example = "2022-09-18 10:11:22", pattern = "yyyy-MM-dd HH:mm:ss", type = "string")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createdTime;
    }

    @Schema(name = "프로그램 신청 응답 API 스펙 (프로그램 정보 포함)", title = "프로그램 신청 응답 API 스펙 (프로그램 정보 포함)")
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ResponseWithProgram {
        @Schema(description = "신청 ID", example = "1")
        private Long id;

        private Long userId;

        private ProgramDto.Response program;

        @Schema(description = "신청 시간", example = "2022-09-18 10:11:22", pattern = "yyyy-MM-dd HH:mm:ss", type = "string")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createdTime;
    }
}
