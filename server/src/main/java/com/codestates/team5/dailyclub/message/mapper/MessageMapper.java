package com.codestates.team5.dailyclub.message.mapper;

import com.codestates.team5.dailyclub.message.dto.MessageDto;
import com.codestates.team5.dailyclub.message.entity.Message;
import org.mapstruct.Mapper;


import java.util.List;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    Message messagePostToMessage (MessageDto.Post requestBody);
    Message messageToMessageResponseDto (Message message);
    List<MessageDto.Response> messagesToMessageResponseDtos(List<Message> messages);
}
