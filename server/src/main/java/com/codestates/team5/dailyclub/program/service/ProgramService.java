package com.codestates.team5.dailyclub.program.service;

import com.codestates.team5.dailyclub.apply.entity.Apply;
import com.codestates.team5.dailyclub.apply.repository.ApplyRepository;
import com.codestates.team5.dailyclub.image.entity.ProgramImage;
import com.codestates.team5.dailyclub.image.repository.ProgramImageRepository;
import com.codestates.team5.dailyclub.image.util.ImageUtils;
import com.codestates.team5.dailyclub.notification.entity.Notification;
import com.codestates.team5.dailyclub.notification.event.NotificationEventPublisher;
import com.codestates.team5.dailyclub.program.dto.SearchFilterDto;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.program.repository.ProgramRepository;
import com.codestates.team5.dailyclub.throwable.entity.BusinessLogicException;
import com.codestates.team5.dailyclub.throwable.entity.ExceptionCode;
import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import static com.codestates.team5.dailyclub.notification.entity.Notification.NotificationType.UPDATE;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.CANNOT_DELETE_DDAY;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.CANNOT_DELETE_OTHERS;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.CANNOT_UPDATE_DDAY;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.CANNOT_UPDATE_OTHERS;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.IMAGE_NOT_FOUND;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.PROGRAM_NOT_FOUND;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.USER_NOT_FOUND;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ProgramService {

    private final ProgramRepository programRepository;
    private final UserRepository userRepository;
    private final ProgramImageRepository programImageRepository;
    private final ApplyRepository applyRepository;
    private final NotificationEventPublisher notificationEventPublisher;

    /**
     * 1. loginUserId로 User 엔티티 Proxy 조회
     * 2. Program 등록
     * 3. ProgramImage 등록
     */
    public Program createProgram(Long loginUserId, Program program, MultipartFile imageFile) throws IOException {
        //User를 DB 조회 (영속성 컨텍스트에 저장)
        User user = userRepository.findById(loginUserId)
                        .orElseThrow(() ->
                            new BusinessLogicException(USER_NOT_FOUND)
                        );

        log.info("user(findById) : {}", user.getClass());

        //유저 Entity 연관관계 설정
        program.setUser(user);

        //Program 등록
        Program createdProgram = programRepository.save(program);

        log.info("[등록] imageFile is null : {}", imageFile == null);

        if (imageFile!= null && !imageFile.isEmpty()) {
            ProgramImage programImage = ImageUtils.parseToProgramImage(imageFile);

            //ProgramImage Entity 연관관계 설정 (양방향)
            programImage.setProgram(createdProgram);

            //ProgramImage 등록
            programImageRepository.save(programImage);
        }

        return createdProgram;
    }

    public Program updateProgram(Long loginUserId,
                                 Program programFromPatchDto,
                                 Long programImageId,
                                 MultipartFile imageFile) throws IOException {
        log.info("programId : {}", programFromPatchDto.getId());

        //유저 존재 확인
        User userById = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(USER_NOT_FOUND)
        );

        //program persistence context 등록
        Program programById
            = programRepository.findById(programFromPatchDto.getId())
                    .orElseThrow(() ->
                        new BusinessLogicException(PROGRAM_NOT_FOUND)
                    );

        //로그인 유저가 작성자인지 확인
        if (!programById.getUser().getId().equals(loginUserId)) {
            throw new BusinessLogicException(CANNOT_UPDATE_OTHERS);
        }

        //신청 인원 있을 시 당일 변경 불가능
        if (programById.getProgramDate().isEqual(LocalDate.now())
            && applyRepository.existsByProgram(programById)) {
            throw new BusinessLogicException(CANNOT_UPDATE_DDAY);
        }

        //programStatus 체크 (numOfRecruits 값이 변경되었을 때만)
        if (!programFromPatchDto.getNumOfRecruits().equals(programById.getNumOfRecruits())) {
            Program.ProgramStatus programStatus
                = checkProgramStatus(programById.getId(), programFromPatchDto.getNumOfRecruits());

            programById.updateProgramStatus(programStatus);
        }

        programById.updateProgram(programFromPatchDto);

        //programImage 처리
        log.info("[수정] imageFile is null : {}", imageFile == null);
        processProgramImage(programImageId, imageFile, programById);

        //신청자들에게 update 알림 보내기
        publishNotificationEventToApplicants(programById.getId(), UPDATE);

        return programById;
    }


    public void deleteProgram(Long loginUserId, Long programId) {
        Program findProgram
            = programRepository.findById(programId)
            .orElseThrow(() ->
                new BusinessLogicException(PROGRAM_NOT_FOUND)
            );

        //유저 존재 확인
        User userById = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(USER_NOT_FOUND)
        );

        //본인이 삭제하는지 확인
        if (!findProgram.getUser().getId().equals(loginUserId)) {
            throw new BusinessLogicException(CANNOT_DELETE_OTHERS);
        }

        //신청 인원 있을 경우 당일 삭제 불가
        if (findProgram.getProgramDate().isEqual(LocalDate.now())
            && applyRepository.existsByProgram(findProgram)) {
            throw new BusinessLogicException(CANNOT_DELETE_DDAY);
        }

        programRepository.deleteById(programId);
    }

    public Program findProgram(Long programId) {
        return programRepository.findById(programId)
            .orElseThrow(() ->
                new BusinessLogicException(PROGRAM_NOT_FOUND)
            );
    }

    //by search
    public Page<Program> findPrograms(int page, int size, SearchFilterDto searchFilterDto) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return programRepository.searchAndFilter(pageable, searchFilterDto);
    }

    //by user id
    public Page<Program> findPrograms(int page, int size, Long userId) {
        //유저 존재 확인
        User userById = userRepository.findById(userId).orElseThrow(() ->
            new BusinessLogicException(USER_NOT_FOUND)
        );
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return programRepository.findByUserId(pageable, userId);
    }



    public Program.ProgramStatus checkProgramStatus(Long programId, int numOfRecruits) {
        List<Apply> appliesByProgramId = applyRepository.findByProgramId(programId);

        int numOfApplicants = appliesByProgramId.size();

        if (numOfRecruits<numOfApplicants) {
            throw new BusinessLogicException(ExceptionCode.FULL_OF_APPLY);
        } else if (numOfRecruits==numOfApplicants) {
            return Program.ProgramStatus.IMPOSSIBLE;
        } else if (numOfRecruits-numOfApplicants==1) {
            return Program.ProgramStatus.IMMINENT;
        } else {
            return Program.ProgramStatus.POSSIBLE;
        }
    }

    //programImage 처리
    private void processProgramImage(Long programImageId, MultipartFile imageFile, Program findProgram) throws IOException {
        /**
         *   수정 / 등록 시 이미지 존재 여부 (imageFile null && isEmpty() / programImageId null 로 판단)
         * 1. x      x  -> 아무 작업 x
         * 2. o      x  -> 이미지 새로 등록
         * 3. x      o  -> 기존 이미지 삭제
         * 4. o      o  -> 이미지 변경
         */
        if ((imageFile != null && !imageFile.isEmpty()) && programImageId == null) {
            //2번 : 이미지 새로 등록
            ProgramImage programImage = ImageUtils.parseToProgramImage(imageFile);

            //ProgramImage Entity 연관관계 설정 (양방향)
            programImage.setProgram(findProgram);

            //ProgramImage 등록
            programImageRepository.save(programImage);
        } else if (imageFile == null && programImageId != null) {
            //3번 : 기존 이미지 삭제
            programImageRepository.deleteById(programImageId);
        } else if ((imageFile != null && !imageFile.isEmpty()) && programImageId != null) {
            //4번 : 이미지 변경
            ProgramImage findProgramImage
                = programImageRepository.findById(programImageId)
                .orElseThrow(() ->
                    new BusinessLogicException(IMAGE_NOT_FOUND)
                );
            ProgramImage programImage = ImageUtils.parseToProgramImage(imageFile);

            //programImage dirty checking
            findProgramImage.updateProgramImage(programImage);
        }
    }

    private void publishNotificationEventToApplicants(Long programId, Notification.NotificationType type) {
        List<Apply> applies = applyRepository.findByProgramId(programId);
        applies.stream()
            .map(apply -> apply.getUser().getId())
            .forEach(userId ->
                {
                    notificationEventPublisher.publish(userId, programId, type);
                }
            );

    }

}
