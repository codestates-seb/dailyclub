package com.codestates.team5.dailyclub.apply.controller;

import com.codestates.team5.dailyclub.apply.dto.ApplyDto;
import com.codestates.team5.dailyclub.apply.entity.Apply;
import com.codestates.team5.dailyclub.apply.mapper.ApplyMapper;
import com.codestates.team5.dailyclub.apply.service.ApplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "프로그램 신청 API")
@Slf4j
@RestController
@RequestMapping("/api/applies")
@RequiredArgsConstructor
public class ApplyController {

    private final ApplyService applyService;
    private final ApplyMapper applyMapper;

    @Operation(summary = "프로그램 신청")
    @ApiResponses(
        @ApiResponse(
            responseCode = "201",
            description = "CREATED"
        )
    )
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApplyDto.Response> postApply(@RequestBody ApplyDto.Post applyPostDto) {
        Long loginUserId = 1L;
        log.info("programId : {}", applyPostDto.getProgramId());

        Apply apply = applyService.createApply(loginUserId, applyPostDto.getProgramId());
        return new ResponseEntity<>(applyMapper.applyToApplyResponseDto(apply), HttpStatus.CREATED);
    }
}
