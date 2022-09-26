package com.codestates.team5.dailyclub.apply.service;

import com.codestates.team5.dailyclub.apply.entity.Apply;
import com.codestates.team5.dailyclub.apply.repository.ApplyRepository;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.program.repository.ProgramRepository;
import com.codestates.team5.dailyclub.program.service.ProgramService;
import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ApplyService {

    private final ProgramService programService;
    private final ApplyRepository applyRepository;
    private final UserRepository userRepository;
    private final ProgramRepository programRepository;

    public Apply createApply(Long loginUserId, Long programId) {
        User userById = userRepository.getReferenceById(loginUserId);
        Program programById = programRepository.getReferenceById(programId);

        Apply apply = Apply.builder()
                            .user(userById)
                            .program(programById)
                            .build();

        //apply 등록
        Apply savedApply = applyRepository.save(apply);

        //check programStatus
        Program.ProgramStatus programStatus
            = programService.checkProgramStatus(programId, programById.getNumOfRecruits());

        //program dirty checking
        programById.updateProgramStatus(programStatus);

        return savedApply;
    }

    public Page<Apply> findAppliesByProgramId(int page, int size, Long programId) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return applyRepository.findAllByProgramId(pageRequest, programId);
    }

    public Page<Apply> findAppliesByUserId(int page, int size, Long userId) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return applyRepository.findAllByUserId(pageRequest, userId);
    }
}
