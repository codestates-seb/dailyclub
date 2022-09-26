package com.codestates.team5.dailyclub.program.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Schema(name = "프로그램 검색/필터 API 스펙", title = "프로그램 검색/필터 API 스펙")
@Getter
@AllArgsConstructor
@Builder
public class SearchFilterDto {
    @Schema(description = "검색 키워드")
    private String keyword;

    @Schema(description = "지역", allowableValues = {"서울", "경기", "강원", "인천", "대전/충청", "대구/경북", "부산/울산/경남", "광주/전라", "제주"})
    private String location;

    @Schema(description = "프로그램 시작 날짜", pattern = "yyyy-MM-dd", example = "2022-09-18")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate programDate;

    @Schema(description = "프로그램 상태", allowableValues = {"모집중", "마감임박", "마감"})
    private String programStatus;
}
