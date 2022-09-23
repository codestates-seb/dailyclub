package com.codestates.team5.dailyclub.apply.service;

import com.codestates.team5.dailyclub.apply.entity.Apply;
import com.codestates.team5.dailyclub.apply.repository.ApplyRepository;
import com.codestates.team5.dailyclub.program.repository.ProgramRepository;
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

    private final ApplyRepository applyRepository;
    private final UserRepository userRepository;
    private final ProgramRepository programRepository;

    public Apply createApply(Long loginUserId, Long programId) {
        Apply apply = Apply.builder()
                            .user(userRepository.getReferenceById(loginUserId))
                            .program(programRepository.getReferenceById(programId))
                            .build();

        return applyRepository.save(apply);
    }

    public Page<Apply> findAppliesByProgramId(int page, int size, Long programId) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return applyRepository.findAllByCriteriaId(pageRequest, programId);
    }

    public Page<Apply> findAppliesByUserId(int page, int size, Long userId) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return applyRepository.findAllByUserId(pageRequest, userId);
    }
}
