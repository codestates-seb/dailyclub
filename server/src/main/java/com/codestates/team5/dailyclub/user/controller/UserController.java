package com.codestates.team5.dailyclub.user.controller;

import com.codestates.team5.dailyclub.jwt.AuthDetails;
import com.codestates.team5.dailyclub.user.dto.UserDto;
import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.user.mapper.UserMapper;
import com.codestates.team5.dailyclub.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Tag(name = "유저 API")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @Operation(summary = "회원가입")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(responseCode = "201", description = "CREATED", content = @Content(schema = @Schema(implementation = UserDto.Response.class)))
    @PostMapping(value = "/join", produces = MediaType.APPLICATION_JSON_VALUE)
    public String joinUser(@RequestBody @Validated UserDto.Post requestBody) {
        User response = userService.createUser(requestBody);
        return "회원가입이 완료되었습니다.";

    }

    @Operation(summary = "회원 조회")
    @ApiResponse(responseCode = "200", description = "OK",content = @Content(schema = @Schema(implementation = UserDto.Response.class)))
    @GetMapping(value = "/api/users/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUser(@PathVariable("userId") Long id) {
        User response = userService.findUser(id);
        return new ResponseEntity<>(userMapper.userToUserResponseDto(response), HttpStatus.OK);
    }

    @Operation(summary = "회원 탈퇴")
    @ApiResponse(responseCode = "204", description = "NOT CONTENT")
    @DeleteMapping(value = "/api/users/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String deleteUser (@PathVariable("userId") Long id, @Parameter(hidden =true) @AuthenticationPrincipal AuthDetails authDetails) {
        Long loginUserId = authDetails.getUserId();
        userService.deleteUser(id, loginUserId);
        return "회원 탈퇴가 완료되었습니다.";
    }


    @Operation(summary = "회원정보 수정")
    @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = UserDto.Response.class)))
    @PatchMapping(value = "/api/users/{userId}",  consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> patchUser(@ParameterObject @ModelAttribute UserDto.Patch userPatchDto,
                                       @RequestPart(required = false) MultipartFile imageFile,
                                       @PathVariable("userId") Long id, @Parameter(hidden =true) @AuthenticationPrincipal AuthDetails authDetails) throws IOException {
        Long loginUserId = authDetails.getUserId();
        User userFromPatchDto = userMapper.userPatchToUser(userPatchDto);
        User response = userService.updateUser(
                loginUserId,
                userFromPatchDto,
                userPatchDto.getUserImageId(),
                imageFile
                );
        return new ResponseEntity<>(userMapper.userToUserResponseDto(response), HttpStatus.OK);

    }

    //로그아웃 컨트롤러
    @GetMapping(value = "/logout/{userId}")
    public String logout(@PathVariable("userId") Long id, @Parameter(hidden =true) @AuthenticationPrincipal AuthDetails authDetails) {
        Long loginUserId =authDetails.getUserId();
        userService.logoutUser(id, loginUserId);
        return "로그아웃 되었습니다.";

    }

}
