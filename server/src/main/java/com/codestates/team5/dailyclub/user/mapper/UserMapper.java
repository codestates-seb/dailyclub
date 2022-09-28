package com.codestates.team5.dailyclub.user.mapper;

import com.codestates.team5.dailyclub.common.mapper.CommonMapper;
import com.codestates.team5.dailyclub.user.dto.UserDto;
import com.codestates.team5.dailyclub.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface UserMapper extends CommonMapper {
    User userPatchToUser(UserDto.Patch requestBody);

    List<UserDto.Response> usersToUserResponseDtos(List<User> users);
}
