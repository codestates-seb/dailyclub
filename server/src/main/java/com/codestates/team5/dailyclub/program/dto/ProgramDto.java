package com.codestates.team5.dailyclub.program.dto;

import com.codestates.team5.dailyclub.image.dto.ProgramImageDto;
import com.codestates.team5.dailyclub.user.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class ProgramDto {

    @Schema(name = "프로그램 등록 요청 API 스펙", title = "프로그램 등록 요청 API 스펙")
    @Getter
    @AllArgsConstructor
    @Builder
    public static class Post {
        @Schema(description = "프로그램 제목", example = "제목")
        private String title;

        @Schema(description = "프로그램 본문", example = "본문")
        private String text;

        @Schema(description = "모집 인원", example = "10")
        private Integer numOfRecruits;

        @Schema(description = "지역명", example = "서울", allowableValues = {"서울", "경기", "강원", "인천", "대전/충청", "대구/경북", "부산/울산/경남", "광주/전라", "제주"})
        private String location;

        @Schema(description = "프로그램 시작 날짜", pattern = "yyyy-MM-dd", example = "2022-09-18")
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate programDate;

        @Schema(description = "최소 신청 가능 친절 %", example = "65")
        private Integer minKind;
    }

    @Schema(name = "프로그램 수정 요청 API 스펙", title = "프로그램 수정 요청 API 스펙")
    @Getter
    @AllArgsConstructor
    @Builder
    public static class Patch {
        @Schema(description = "프로그램 ID", example = "4")
        private Long id;

        @Schema(description = "프로그램 제목", example = "한강 달리기 하실 분??")
        private String title;

        @Schema(description = "프로그램 본문", example = "10/18 여의도 한강공원에서 저녁 8시에 같이 달리실 분 모집합니다.")
        private String text;

        @Schema(description = "모집 인원", example = "7")
        private Integer numOfRecruits;

        @Schema(description = "지역명", example = "서울", allowableValues = {"서울", "경기", "부산/울산/경남"})
        private String location;

        @Schema(description = "프로그램 시작 날짜", name = "program-date", pattern = "yyyy-MM-dd", example = "2022-09-18")
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate programDate;

        @Schema(description = "최소 신청 가능 친절 %", example = "70")
        private Integer minKind;
    }

    @Schema(name = "프로그램 응답 API 스펙", title = "프로그램 응답 API 스펙")
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        @Schema(description = "프로그램 ID", example = "1")
        private Long id;

        @Schema(description = "작성자")
        private UserDto.Response writer;

        @Schema(description = "프로그램 제목", example = "놀러갈 사람!")
        private String title;

        @Schema(description = "프로그램 본문")
        private String text;

        @Schema(description = "모집 인원", example = "10")
        private Integer numOfRecruits;

        @Schema(description = "지역명", example="서울", allowableValues = {"서울", "경기", "강원", "인천", "대전/충청", "대구/경북", "부산/울산/경남", "광주/전라", "제주"})
        private String location;

        @Schema(description = "프로그램 시작 날짜", pattern = "yyyy-MM-dd")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate programDate;

        @Schema(description = "최소 신청 가능 친절%")
        private Integer minKind;

        @Schema(description = "인원 상태", example = "모집중", allowableValues = {"모집중", "마감임박", "마감"})
        private String programStatus;

        @Schema(description = "북마크 ID")
        private Long bookmarkId;

        @Schema(description = "프로그램 작성 시간", example = "2022-09-18 10:11:22", pattern = "yyyy-MM-dd HH:mm:ss", type = "string")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createdDate;

        @Schema(title = "프로그램 이미지 리스트")
        private List<ProgramImageDto.Response> programImages;

        @Schema(title = "신청 인원 리스트")
        private List<UserDto.Response> applyList;

    }

}
