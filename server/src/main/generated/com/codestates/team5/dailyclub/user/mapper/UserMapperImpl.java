package com.codestates.team5.dailyclub.user.mapper;

import com.codestates.team5.dailyclub.user.dto.UserDto;
import com.codestates.team5.dailyclub.user.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-09-21T22:49:16+0900",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPatchToUser(UserDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.id( requestBody.getId() );
        user.nickname( requestBody.getNickname() );
        user.picture( requestBody.getPicture() );
        user.introduction( requestBody.getIntroduction() );

        return user.build();
    }

    @Override
    public UserDto.Response userToUserResponseDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.Response.ResponseBuilder response = UserDto.Response.builder();

        response.id( user.getId() );
        response.loginId( user.getLoginId() );
        response.nickname( user.getNickname() );
        response.picture( user.getPicture() );
        response.introduction( user.getIntroduction() );
        response.kind( user.getKind() );
        if ( user.getRole() != null ) {
            response.role( user.getRole().name() );
        }

        return response.build();
    }

    @Override
    public List<UserDto.Response> usersToUserResponseDtos(List<User> users) {
        if ( users == null ) {
            return null;
        }

        List<UserDto.Response> list = new ArrayList<UserDto.Response>( users.size() );
        for ( User user : users ) {
            list.add( userToUserResponseDto( user ) );
        }

        return list;
    }
}
