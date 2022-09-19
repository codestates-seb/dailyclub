package com.codestates.team5.dailyclub.program.service;

import com.codestates.team5.dailyclub.program.dto.SearchFilterDto;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.program.repository.ProgramRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ProgramService {

    private final ProgramRepository programRepository;

    public Program createProgram(Program program) {
        return programRepository.save(program);
    }

    public void deleteProgram(Long id) {

    }

    public Page<Program> findPrograms(int page, int size, SearchFilterDto searchFilterDto) {
        return null;
    }
}
