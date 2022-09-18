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
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @Operation(summary = "회원가입")
    @ApiResponse(content = @Content(schema = @Schema(implementation = UserDto.Response.class)))
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postUser(@RequestBody UserDto.Post requestBody) {
        User user = userMapper.userPostToUser(requestBody);
        User response = userService.createUser(user);
        return new ResponseEntity<>(userMapper.userToUserResponseDto(response), HttpStatus.CREATED);

    }
    @Operation(summary = "회원정보 수정")
    @ApiResponse(content = @Content(schema = @Schema(implementation = UserDto.Response.class)))
    @PatchMapping(value = "/{user-id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> patchUser(@RequestBody UserDto.Patch requestBody, @Parameter( hidden = true ) @PathVariable("user-id") long id) {
        User user = userMapper.userPatchToUser(requestBody);
        User response = userService.updateUser(user, id);
        return new ResponseEntity<>(userMapper.userToUserResponseDto(response), HttpStatus.OK);

    }
    @Operation(summary = "회원 한명 조회")
    @ApiResponse(content = @Content(schema = @Schema(implementation = UserDto.Response.class)))
    @GetMapping(value = "/{user-id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUser( @Parameter( hidden = true ) @PathVariable("user-id") long id) {
        User response = userService.findUser(id);
        return new ResponseEntity<>(userMapper.userToUserResponseDto(response), HttpStatus.OK);
    }
    @Operation(summary = "회원 리스트")
    @ApiResponse
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MultiResponseDto<UserDto.Response>> getUsers(int page, int size) {
        Page<User> pageUsers = userService.findUsers(page - 1, size);
        List<User> users = pageUsers.getContent();
        List<UserDto.Response> responseDtos = userMapper.usersToUserResponseDtos(users);
        return new ResponseEntity<>(new MultiResponseDto<>(responseDtos), HttpStatus.OK);
    }
    @Operation(summary = "회원 탈퇴")
    @ApiResponse(content = @Content(schema = @Schema(implementation = UserDto.Response.class)))
    @DeleteMapping(value = "/{user-id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteUser ( @Parameter( hidden = true) @PathVariable("user-id") long id) {
        userService.deleteUser(id);
    }

}
