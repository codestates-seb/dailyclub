package com.codestates.team5.dailyclub.review.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

public class ReviewDto {

    @Schema(name = "리뷰 등록 요청 API 스펙", title = "리뷰 등록 요청 API 스펙")
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Post {
        @Schema(description = "신청 ID", example = "2")
        @NotNull
        private Long applyId;

        @Schema(title = "다시 함께하고 싶은 멤버 ID 리스트")
        private List<Long> likes;

        @Schema(description = "다신 함께하고 싶지 않은 멤버 ID", example = "제목")
        private Long hate;

        @Schema(description = "프로그램 만족도", allowableValues = {"-2", "-1", "0", "1", "2"})
        @NotNull
        private Integer score;
    }
}
