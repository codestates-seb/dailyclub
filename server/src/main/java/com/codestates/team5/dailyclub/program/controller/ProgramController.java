package com.codestates.team5.dailyclub.program.controller;

import com.codestates.team5.dailyclub.common.dto.MultiResponseDto;
import com.codestates.team5.dailyclub.image.entity.ProgramImage;
import com.codestates.team5.dailyclub.image.util.ImageUtils;
import com.codestates.team5.dailyclub.program.dto.ProgramDto;
import com.codestates.team5.dailyclub.program.dto.SearchFilterDto;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.program.mapper.ProgramMapper;
import com.codestates.team5.dailyclub.program.service.ProgramService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Tag(name = "프로그램 API")
@Slf4j
@RestController
@RequestMapping("/api/programs")
@RequiredArgsConstructor
public class ProgramController {

    private final ProgramService programService;
    private final ProgramMapper programMapper;

    @Operation(summary = "프로그램 등록")
    @ApiResponses(
        @ApiResponse(
            responseCode = "201",
            description = "CREATED"
        )
    )
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProgramDto.Response> postProgram(@ParameterObject @ModelAttribute ProgramDto.Post programPostDto,
                                                           @RequestPart(required = false) MultipartFile imageFile) throws IOException {
        Long loginUserId = 1L;
        Program programFromPostDto = programMapper.programPostDtoToProgram(programPostDto);

        //ProgramService 호출 (Program 등록 후 ProgramImage 등록)
        Program createdProgram = programService.createProgram(loginUserId, programFromPostDto, imageFile);

        ProgramDto.Response response = programMapper.programToProgramResponseDto(createdProgram);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "프로그램 수정")
    @ApiResponses(
        @ApiResponse(
            responseCode = "200",
            description = "OK"
        )
    )
    @PatchMapping(value = "/{programId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProgramDto.Response> patchProgram(@ParameterObject @ModelAttribute ProgramDto.Patch programPatchDto,
                                                            @RequestPart(required = false) MultipartFile imageFile,
                                                            @PathVariable("programId") Long programId) throws IOException {
        Long loginUserId = 1L;
        Program programFromPatchDto = programMapper.programPatchDtoToProgram(programPatchDto);

        Program updatedProgram = programService.updateProgram(
            loginUserId,
            programFromPatchDto,
            programPatchDto.getProgramImageId(),
            imageFile
        );

        return new ResponseEntity<>(programMapper.programToProgramResponseDto(updatedProgram), HttpStatus.OK);
    }

    @Operation(summary = "프로그램 조회")
    @ApiResponses(
        @ApiResponse(
            responseCode = "200",
            description = "OK"
        )
    )
    @GetMapping("/{programId}")
    public ResponseEntity<ProgramDto.Response> getProgram(@PathVariable("programId") Long id) {
        Program program = programService.findProgram(id);

        ProgramDto.Response response = programMapper.programToProgramResponseDto(program);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "프로그램 리스트 조회")
    @ApiResponses(
        @ApiResponse(
            responseCode = "200",
            description = "OK"
        )
    )
    @GetMapping
    public ResponseEntity<MultiResponseDto<ProgramDto.Response>> getPrograms(@Parameter(description = "페이지 번호") @RequestParam int page,
                                                                             @Parameter(description = "한 페이지당 프로그램 수") @RequestParam int size,
                                                                             @ParameterObject @ModelAttribute SearchFilterDto searchFilterDto) {
        Page<Program> pagePrograms = programService.findPrograms(page-1, size, searchFilterDto);
        List<Program> programs = pagePrograms.getContent();
        List<ProgramDto.Response> responses = programMapper.programListToProgramResponseDtoList(programs);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pagePrograms), HttpStatus.OK);
    }

    @Operation(summary = "프로그램 삭제")
    @ApiResponses(
        @ApiResponse(
            responseCode = "204",
            description = "NO CONTENT")
    )
    @DeleteMapping("/{programId}")
    public void deleteProgram(@PathVariable("programId") Long programId) {
        programService.deleteProgram(programId);
    }

}
