package com.codestates.team5.dailyclub.message.mapper;

import com.codestates.team5.dailyclub.message.dto.MessageDto;
import com.codestates.team5.dailyclub.message.entity.Message;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-09-21T13:35:07+0900",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class MessageMapperImpl implements MessageMapper {

    @Override
    public Message messagePostToMessage(MessageDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Message.MessageBuilder message = Message.builder();

        message.text( requestBody.getText() );

        return message.build();
    }

    @Override
    public Message messageToMessageResponseDto(Message message) {
        if ( message == null ) {
            return null;
        }

        Message.MessageBuilder message1 = Message.builder();

        message1.id( message.getId() );
        message1.fromUser( message.getFromUser() );
        message1.toUser( message.getToUser() );
        message1.text( message.getText() );
        message1.readStatus( message.getReadStatus() );

        return message1.build();
    }

    @Override
    public List<MessageDto.Response> messagesToMessageResponseDtos(List<Message> messages) {
        if ( messages == null ) {
            return null;
        }

        List<MessageDto.Response> list = new ArrayList<MessageDto.Response>( messages.size() );
        for ( Message message : messages ) {
            list.add( messageToResponse( message ) );
        }

        return list;
    }

    protected MessageDto.Response messageToResponse(Message message) {
        if ( message == null ) {
            return null;
        }

        MessageDto.Response.ResponseBuilder response = MessageDto.Response.builder();

        response.id( message.getId() );
        response.text( message.getText() );
        if ( message.getReadStatus() != null ) {
            response.readStatus( message.getReadStatus().name() );
        }
        response.createdDate( message.getCreatedDate() );

        return response.build();
    }
}
