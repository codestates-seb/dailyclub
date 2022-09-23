package com.codestates.team5.dailyclub.user.mapper;

import com.codestates.team5.dailyclub.user.dto.UserDto;
import com.codestates.team5.dailyclub.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPatchToUser(UserDto.Patch requestBody);

    UserDto.Response userToUserResponseDto(User user);

    List<UserDto.Response> usersToUserResponseDtos(List<User> users);
}
