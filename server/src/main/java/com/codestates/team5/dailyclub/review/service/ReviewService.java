package com.codestates.team5.dailyclub.review.service;

import com.codestates.team5.dailyclub.apply.entity.Apply;
import com.codestates.team5.dailyclub.apply.repository.ApplyRepository;
import com.codestates.team5.dailyclub.review.dto.ReviewDto;
import com.codestates.team5.dailyclub.throwable.entity.BusinessLogicException;
import com.codestates.team5.dailyclub.throwable.entity.ExceptionCode;
import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ReviewService {

    private final UserRepository userRepository;
    private final ApplyRepository applyRepository;

    private static final int LIKE_SCORE = 1;
    private static final int HATE_SCORE = -1;

    public void createReview(ReviewDto.Post reviewPostDto, Long loginUserId) {
        //유저 존재 확인
        User loginUser = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
        );

        //신청 존재 확인
        Apply applyById = applyRepository.findById(reviewPostDto.getApplyId()).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.APPLY_NOT_FOUND)
        );

        //신청한 본인이 리뷰 남기는지 확인
        if (!applyById.getUser().getId().equals(loginUserId)) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_REVIEW_OTHERS);
        }

        //이미 리뷰 남긴 신청인지 확인
        if (applyById.getReviewStatus().equals(Apply.ReviewStatus.REVIEWED)) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_REVIEWED);
        }

        //likes
        reviewPostDto.getLikes().forEach(userId -> {
            User userById = userRepository.findById(userId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
            );
            userById.updateKind(LIKE_SCORE);
        });

        //hate
        User hateUser = userRepository.findById(reviewPostDto.getHate()).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
        );
        hateUser.updateKind(HATE_SCORE);

        //score
        User writer = userRepository.findById(applyById.getProgram().getUser().getId()).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
        );
        writer.updateKind(reviewPostDto.getScore());

        //Apply review status 변경
        applyById.updateReviewStatus();
    }

}
