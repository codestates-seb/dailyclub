package com.codestates.team5.dailyclub.review.controller;

import com.codestates.team5.dailyclub.jwt.AuthDetails;
import com.codestates.team5.dailyclub.review.dto.ReviewDto;
import com.codestates.team5.dailyclub.review.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "리뷰 API")
@Slf4j
@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @Operation(summary = "리뷰 등록")
    @ApiResponses(
        @ApiResponse(
            responseCode = "201",
            description = "CREATED"
        )
    )
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postReview(@Validated @RequestBody ReviewDto.Post reviewPostDto,
                                             @Parameter(hidden = true) @AuthenticationPrincipal AuthDetails authDetails) {
        Long loginUserId = authDetails.getUserId();
        reviewService.createReview(reviewPostDto, loginUserId);

        return new ResponseEntity<>("success", HttpStatus.CREATED);
    }
}
