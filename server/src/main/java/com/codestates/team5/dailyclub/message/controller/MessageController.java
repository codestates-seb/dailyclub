package com.codestates.team5.dailyclub.message.controller;

import com.codestates.team5.dailyclub.common.dto.MultiResponseDto;
import com.codestates.team5.dailyclub.message.dto.MessageDto;
import com.codestates.team5.dailyclub.message.entity.Message;
import com.codestates.team5.dailyclub.message.mapper.MessageMapper;
import com.codestates.team5.dailyclub.message.service.MessageService;
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
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    private final MessageMapper messageMapper;

    @Operation(summary = "메세지 작성")
    @ApiResponse(content = @Content(schema = @Schema(implementation = MessageDto.Response.class)))
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postMessage(@RequestBody MessageDto.Post requestBody) {
        Message message = messageMapper.messagePostToMessage(requestBody);
        Message response = messageService.createMessage(message);
        return new ResponseEntity<>(messageMapper.messageToMessageResponseDto(response), HttpStatus.CREATED);
    }
    @Operation(summary = "메세지 하나 조회")
    @ApiResponse(content = @Content(schema = @Schema(implementation = MessageDto.Response.class)))
    @GetMapping(value = "/{message-id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMessage(@Parameter(hidden = true) @PathVariable("message-id") long id) {
        Message response = messageService.findMessage(id);
        return new ResponseEntity<>(messageMapper.messageToMessageResponseDto(response), HttpStatus.OK);
    }

    @Operation(summary = "메세지 리스트 조회")
    @ApiResponse(content = @Content(schema = @Schema(implementation = MessageDto.Response.class)))
    @GetMapping( produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMessages(int page, int size) {
        Page<Message> pageMessages = messageService.findMessages(page -1, size);
        List<Message> messages = pageMessages.getContent();
        List<MessageDto.Response> responseDtos = messageMapper.messagesToMessageResponseDtos(messages);
        return new ResponseEntity<>(new MultiResponseDto<>(responseDtos), HttpStatus.OK);
    }
    @Operation(summary = "메세지 삭제")
    @ApiResponse(content = @Content(schema = @Schema(implementation = MessageDto.Response.class)))
    @DeleteMapping(value = "/{message-id}" ,produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteMessage (@Parameter(hidden = true) @PathVariable("message-id") long id) {
        messageService.deleteMessage(id);
    }




}