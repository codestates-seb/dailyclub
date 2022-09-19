package com.codestates.team5.dailyclub.program.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Schema(name = "프로그램 검색/필터 API 스펙", title = "프로그램 검색/필터 API 스펙")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchFilterDto {
    @Schema(description = "검색 키워드")
    private String keyword;

    @Schema(description = "지역 번호", name = "location-id")
    private Long locationId;

    @Schema(description = "프로그램 시작 날짜", name = "program-date", pattern = "yyyy-MM-dd", example = "2022-09-18")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate programDate;

    @Schema(description = "프로그램 상태", allowableValues = {"POSSIBLE", "IMMINENT"}, name = "program-status")
    private String programStatus;
}
