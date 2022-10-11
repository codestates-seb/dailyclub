package com.codestates.team5.dailyclub.apply.service;

import com.codestates.team5.dailyclub.apply.entity.Apply;
import com.codestates.team5.dailyclub.apply.repository.ApplyRepository;
import com.codestates.team5.dailyclub.notification.event.NotificationEventPublisher;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.program.repository.ProgramRepository;
import com.codestates.team5.dailyclub.program.service.ProgramService;
import com.codestates.team5.dailyclub.throwable.entity.BusinessLogicException;
import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static com.codestates.team5.dailyclub.notification.entity.Notification.NotificationType.APPLY_COMPLETE;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.ALREADY_APPLIED;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.APPLY_NOT_FOUND;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.CANNOT_APPLY_MINE;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.CANNOT_CANCEL_DDAY;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.CANNOT_CANCEL_OTHERS;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.FULL_OF_APPLY;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.LOWER_THAN_MIN_KIND;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.PROGRAM_ALREADY_ENDED;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.PROGRAM_NOT_FOUND;
import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.USER_NOT_FOUND;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ApplyService {

    private final ProgramService programService;
    private final ApplyRepository applyRepository;
    private final UserRepository userRepository;
    private final ProgramRepository programRepository;
    private final NotificationEventPublisher notificationEventPublisher;

    public Apply createApply(Long loginUserId, Long programId) {
        //유저 존재 확인
        User userById = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(USER_NOT_FOUND)
        );
        //프로그램 존재 확인
        Program programById = programRepository.findById(programId).orElseThrow(() ->
            new BusinessLogicException(PROGRAM_NOT_FOUND)
        );
        //본인 프로그램에 신청하려는 건지 확인
        if (programById.getUser().getId().equals(loginUserId)) {
            throw new BusinessLogicException(CANNOT_APPLY_MINE);
        }
        //이미 신청한 프로그램인지 확인
        if (applyRepository.existsByUserAndProgram(userById, programById)) {
            throw new BusinessLogicException(ALREADY_APPLIED);
        }
        //Apply 등록 전 현재 programStatus 체크
        if (programById.getProgramStatus() == Program.ProgramStatus.IMPOSSIBLE) {
            throw new BusinessLogicException(FULL_OF_APPLY);
        }
        //최소 신청 가능 친절 %보다 본인의 친절 %가 높은지 확인
        if (programById.getMinKind() > userById.getKind()) {
            throw new BusinessLogicException(LOWER_THAN_MIN_KIND);
        }
        //종료된 프로그램인지 확인
        if (programById.getProgramDate().isBefore(LocalDate.now())) {
            throw new BusinessLogicException(PROGRAM_ALREADY_ENDED);
        }

        Apply apply = Apply.builder()
                            .user(userById)
                            .program(programById)
                            .build();

        //Apply 등록
        Apply savedApply = applyRepository.save(apply);

        //Apply 등록 후 새 programStatus 구하기
        Program.ProgramStatus updatedProgramStatus
            = programService.checkProgramStatus(programId, programById.getNumOfRecruits());

        //program dirty checking
        programById.updateProgramStatus(updatedProgramStatus);

        //신청 완료 알림 보내기
        notificationEventPublisher.publish(loginUserId, programId, APPLY_COMPLETE);

        return savedApply;
    }

    public Page<Apply> findAppliesByProgramId(int page, int size, Long programId) {
        //프로그램 존재 확인
        Program programById = programRepository.findById(programId).orElseThrow(() ->
            new BusinessLogicException(PROGRAM_NOT_FOUND)
        );

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return applyRepository.findAllByProgramId(pageRequest, programId);
    }

    public int countAppliesByProgramId(Long programId) {
        return applyRepository.findByProgramId(programId).size();
    }

    public Page<Apply> findAppliesByUserId(int page, int size, Long userId) {
        //유저 존재 확인
        User userById = userRepository.findById(userId).orElseThrow(() ->
            new BusinessLogicException(USER_NOT_FOUND)
        );

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return applyRepository.findAllByUserId(pageRequest, userId);
    }

    public void deleteApply(Long loginUserId, Long applyId) {
        //유저 존재 확인
        User userById = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(USER_NOT_FOUND)
        );

        //신청 여부 확인
        Apply applyById = applyRepository.findById(applyId).orElseThrow(() ->
            new BusinessLogicException(APPLY_NOT_FOUND)
        );

        //신청한 본인이 취소하는지 확인
        if (!applyById.getUser().getId().equals(loginUserId)) {
            throw new BusinessLogicException(CANNOT_CANCEL_OTHERS);
        }

        //당일 신청 취소 불가
        if (applyById.getProgram().getProgramDate().isEqual(LocalDate.now())) {
            throw new BusinessLogicException(CANNOT_CANCEL_DDAY);
        }

        //신청 삭제
        applyRepository.deleteById(applyId);

        //프로그램 조회
        Program programById = programRepository.findById(applyById.getProgram().getId()).orElseThrow(() ->
            new BusinessLogicException(PROGRAM_NOT_FOUND)
        );

        //새로운 프로그램 상태
        Program.ProgramStatus updatedProgramStatus
            = programService.checkProgramStatus(programById.getId(),
                                                programById.getNumOfRecruits());

        //프로그램 dirty checking
        programById.updateProgramStatus(updatedProgramStatus);
    }


}
