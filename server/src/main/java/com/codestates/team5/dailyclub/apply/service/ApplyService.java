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
        //?????? ?????? ??????
        User userById = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(USER_NOT_FOUND)
        );
        //???????????? ?????? ??????
        Program programById = programRepository.findById(programId).orElseThrow(() ->
            new BusinessLogicException(PROGRAM_NOT_FOUND)
        );
        //?????? ??????????????? ??????????????? ?????? ??????
        if (programById.getUser().getId().equals(loginUserId)) {
            throw new BusinessLogicException(CANNOT_APPLY_MINE);
        }
        //?????? ????????? ?????????????????? ??????
        if (applyRepository.existsByUserAndProgram(userById, programById)) {
            throw new BusinessLogicException(ALREADY_APPLIED);
        }
        //Apply ?????? ??? ?????? programStatus ??????
        if (programById.getProgramStatus() == Program.ProgramStatus.IMPOSSIBLE) {
            throw new BusinessLogicException(FULL_OF_APPLY);
        }
        //?????? ?????? ?????? ?????? %?????? ????????? ?????? %??? ????????? ??????
        if (programById.getMinKind() > userById.getKind()) {
            throw new BusinessLogicException(LOWER_THAN_MIN_KIND);
        }
        //????????? ?????????????????? ??????
        if (programById.getProgramDate().isBefore(LocalDate.now())) {
            throw new BusinessLogicException(PROGRAM_ALREADY_ENDED);
        }

        Apply apply = Apply.builder()
                            .user(userById)
                            .program(programById)
                            .build();

        //Apply ??????
        Apply savedApply = applyRepository.save(apply);

        //Apply ?????? ??? ??? programStatus ?????????
        Program.ProgramStatus updatedProgramStatus
            = programService.checkProgramStatus(programId, programById.getNumOfRecruits());

        //program dirty checking
        programById.updateProgramStatus(updatedProgramStatus);

        //?????? ?????? ?????? ?????????
        notificationEventPublisher.publish(loginUserId, programId, APPLY_COMPLETE);

        return savedApply;
    }

    public Page<Apply> findAppliesByProgramId(int page, int size, Long programId) {
        //???????????? ?????? ??????
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
        //?????? ?????? ??????
        User userById = userRepository.findById(userId).orElseThrow(() ->
            new BusinessLogicException(USER_NOT_FOUND)
        );

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return applyRepository.findAllByUserId(pageRequest, userId);
    }

    public void deleteApply(Long loginUserId, Long applyId) {
        //?????? ?????? ??????
        User userById = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(USER_NOT_FOUND)
        );

        //?????? ?????? ??????
        Apply applyById = applyRepository.findById(applyId).orElseThrow(() ->
            new BusinessLogicException(APPLY_NOT_FOUND)
        );

        //????????? ????????? ??????????????? ??????
        if (!applyById.getUser().getId().equals(loginUserId)) {
            throw new BusinessLogicException(CANNOT_CANCEL_OTHERS);
        }

        //?????? ?????? ?????? ??????
        if (applyById.getProgram().getProgramDate().isEqual(LocalDate.now())) {
            throw new BusinessLogicException(CANNOT_CANCEL_DDAY);
        }

        //?????? ??????
        applyRepository.deleteById(applyId);

        //???????????? ??????
        Program programById = programRepository.findById(applyById.getProgram().getId()).orElseThrow(() ->
            new BusinessLogicException(PROGRAM_NOT_FOUND)
        );

        //????????? ???????????? ??????
        Program.ProgramStatus updatedProgramStatus
            = programService.checkProgramStatus(programById.getId(),
                                                programById.getNumOfRecruits());

        //???????????? dirty checking
        programById.updateProgramStatus(updatedProgramStatus);
    }


}
