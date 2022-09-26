package com.codestates.team5.dailyclub.apply.controller;

import com.codestates.team5.dailyclub.apply.dto.ApplyDto;
import com.codestates.team5.dailyclub.apply.entity.Apply;
import com.codestates.team5.dailyclub.apply.mapper.ApplyMapper;
import com.codestates.team5.dailyclub.apply.service.ApplyService;
import com.codestates.team5.dailyclub.common.dto.MultiResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @Operation(summary = "프로그램 신청 리스트 조회 by program id")
    @ApiResponses(
        @ApiResponse(
            responseCode = "200",
            description = "OK"
        )
    )
    @GetMapping
    public ResponseEntity<MultiResponseDto<ApplyDto.ResponseWithUser>> getAppliesByProgramId(@Parameter(description = "페이지 번호") @RequestParam int page,
                                                                                             @Parameter(description = "한 페이지당 신청 인원 수") @RequestParam int size,
                                                                                             @RequestParam Long programId) {
        Page<Apply> pageApplies = applyService.findAppliesByProgramId(page - 1, size, programId);
        List<Apply> applies = pageApplies.getContent();
        List<ApplyDto.ResponseWithUser> responses = applyMapper.appliesToResponseWithUserDtos(applies);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageApplies), HttpStatus.OK);
    }

    @Operation(summary = "프로그램 신청 리스트 조회 by user id")
    @ApiResponses(
        @ApiResponse(
            responseCode = "200",
            description = "OK"
        )
    )
    @GetMapping("/myPage")
    public ResponseEntity<MultiResponseDto<ApplyDto.ResponseWithProgram>> getAppliesByUserId(@Parameter(description = "페이지 번호") @RequestParam int page,
                                                                                             @Parameter(description = "한 페이지당 신청 인원 수") @RequestParam int size) {
        Long loginUserId = 1L;
        Page<Apply> pageApplies = applyService.findAppliesByUserId(page - 1, size, loginUserId);
        List<Apply> applies = pageApplies.getContent();
        List<ApplyDto.ResponseWithProgram> responses = applyMapper.appliesToResponseWithProgramDtos(applies);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageApplies), HttpStatus.OK);
    }
}
