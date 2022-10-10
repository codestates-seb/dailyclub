package com.codestates.team5.dailyclub.apply.controller;

import com.codestates.team5.dailyclub.apply.dto.ApplyDto;
import com.codestates.team5.dailyclub.apply.entity.Apply;
import com.codestates.team5.dailyclub.apply.mapper.ApplyMapper;
import com.codestates.team5.dailyclub.apply.service.ApplyService;
import com.codestates.team5.dailyclub.common.dto.MultiResponseDto;
import com.codestates.team5.dailyclub.jwt.AuthDetails;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @Operation(summary = "프로그램 신청 등록")
    @ApiResponses(
        @ApiResponse(
            responseCode = "201",
            description = "CREATED"
        )
    )
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApplyDto.Response> postApply(@RequestBody ApplyDto.Post applyPostDto,
                                                       @Parameter(hidden = true) @AuthenticationPrincipal AuthDetails authDetails) {
        Long loginUserId = authDetails.getUser().getId();
        log.info("[postApply] loginUserId={}, programId={}", loginUserId, applyPostDto.getProgramId());

        Apply apply = applyService.createApply(loginUserId, applyPostDto.getProgramId());
        ApplyDto.Response responseDto = applyMapper.applyToApplyResponseDto(apply);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @Operation(summary = "한 프로그램의 신청 리스트 조회 (상세페이지)")
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

    @Operation(summary = "한 유저가 신청한 프로그램 리스트 조회 (마이 페이지)")
    @ApiResponses(
        @ApiResponse(
            responseCode = "200",
            description = "OK"
        )
    )
    @GetMapping("/mypage")
    public ResponseEntity<MultiResponseDto<ApplyDto.ResponseWithProgram>> getAppliesByUserId(@Parameter(description = "페이지 번호") @RequestParam int page,
                                                                                             @Parameter(description = "한 페이지당 신청 인원 수") @RequestParam int size,
                                                                                             @Parameter(description = "유저 ID") @RequestParam Long userId) {
        Page<Apply> pageApplies = applyService.findAppliesByUserId(page - 1, size, userId);
        List<Apply> applies = pageApplies.getContent();
        List<ApplyDto.ResponseWithProgram> responses = applyMapper.appliesToResponseWithProgramDtos(applies);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageApplies), HttpStatus.OK);
    }

    @Operation(summary = "프로그램 신청 취소")
    @ApiResponses(
        @ApiResponse(
            responseCode = "204",
            description = "NO CONTENT")
    )
    @DeleteMapping("/{applyId}")
    public String deleteProgram(@PathVariable("applyId") Long applyId,
                              @Parameter(hidden = true) @AuthenticationPrincipal AuthDetails authDetails) {
        Long loginUserId = authDetails.getUser().getId();
        applyService.deleteApply(loginUserId, applyId);
        return "신청을 취소했습니다.";
    }

}
