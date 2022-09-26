package com.codestates.team5.dailyclub.user.controller;

import com.codestates.team5.dailyclub.common.dto.MultiResponseDto;
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
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Tag(name = "유저 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @Operation(summary = "회원가입")
    @ApiResponse(responseCode = "201", description = "CREATED", content = @Content(schema = @Schema(implementation = UserDto.Response.class)))
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postUser(@RequestBody UserDto.Post requestBody) {
        User response = userService.createUser(requestBody);
        return new ResponseEntity<>(userMapper.userToUserResponseDto(response), HttpStatus.CREATED);

    }

    @Operation(summary = "회원 한명 조회")
    @ApiResponse(responseCode = "200", description = "OK",content = @Content(schema = @Schema(implementation = UserDto.Response.class)))
    @GetMapping(value = "/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUser(@PathVariable("userId") long id) {
        User response = userService.findUser(id);
        return new ResponseEntity<>(userMapper.userToUserResponseDto(response), HttpStatus.OK);
    }

    @Operation(summary = "회원 리스트")
    @ApiResponse(responseCode = "200", description = "OK")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MultiResponseDto<UserDto.Response>> getUsers(@Parameter(description = "페이지 번호") @RequestParam int page,
                                                                       @Parameter(description = "한 페이지당 알림 수") @RequestParam int size) {
        Page<User> pageUsers = userService.findUsers(page - 1, size);
        List<User> users = pageUsers.getContent();
        List<UserDto.Response> responseDtos = userMapper.usersToUserResponseDtos(users);
        return new ResponseEntity<>(new MultiResponseDto<>(responseDtos,pageUsers), HttpStatus.OK);
    }
    @Operation(summary = "회원 탈퇴")
    @ApiResponse(responseCode = "204", description = "NOT CONTENT")
    @DeleteMapping(value = "/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteUser (@PathVariable("userId") long id) {
        userService.deleteUser(id);
    }


    @Operation(summary = "회원정보 수정")
    @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = UserDto.Response.class)))
    @PatchMapping(value = "{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> patchUser(@RequestBody UserDto.Patch requestBody, @PathVariable("userId") long id) {
        User user = userMapper.userPatchToUser(requestBody);
        User response = userService.updateUser(user, id);
        return new ResponseEntity<>(userMapper.userToUserResponseDto(response), HttpStatus.OK);

    }

}
