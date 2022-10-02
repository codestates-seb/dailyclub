package com.codestates.team5.dailyclub.user.dto;

import com.codestates.team5.dailyclub.image.dto.UserImageDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


public class UserDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(name = "회원 가입 API 스펙", title = "회원 가입 API 스펙")
    public static class Post {
        @Schema(description = "로그인 ID", example = "meow123")
        private String loginId;
        @Schema(description = "패스워드", example = "rerewr")
        private String password;
        @Schema(description = "닉네임", example = "냥냥")
        private String nickname;
        @Schema(description = "email", example = "abcd@sdfe.com")
        private String email;
    }
    @Getter
    @AllArgsConstructor
    @Builder
    @Schema(name = "회원 정보 수정 API 스펙", title = "회원 정보 수정 API 스펙")
    public static class Patch {
        @Schema(description = "유저 ID", example = "1")
        private Long id;
        @Schema(description = "닉네임", example = "냥냥")
        private String nickname;
        @Schema(description = "프로필 이미지 ID")
        private Long userImageId;
        @Schema(description = "자기소개", example = "자기소개 입니다.")
        private String introduction;
    }
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(name = "회원 response API 스펙", title = "회원 response API 스펙")
    public static class Response {
        @Schema(description = "유저 ID", example = "1")
        private Long id;
        @Schema(description = "로그인 ID", example = "meow123")
        private String loginId;
        @Schema(description = "닉네임", example = "냥냥")
        private String nickname;
        //      수정예정
        @Schema(description = "자기소개", example = "자기소개 입니다.")
        private String introduction;
        @Schema(description = "친절도", example = "50")
        private Integer kind;
        @Schema(description = "권한", example = "USER")
        private String role;

        @Schema(title = "유저 프로필")
        private List<UserImageDto.Response> userImages;
    }
}
