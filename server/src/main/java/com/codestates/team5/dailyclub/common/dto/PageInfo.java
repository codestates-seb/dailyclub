package com.codestates.team5.dailyclub.common.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PageInfo {
    @Schema(description = "현재 페이지")
    private int page;
    @Schema(description = "페이지 사이즈")
    private int size;
    @Schema(description = "전체 데이터 수")
    private long totalElements;
    @Schema(description = "전체 페이지 수")
    private int totalPages;
}
