package com.codestates.team5.dailyclub.program.service;

import com.codestates.team5.dailyclub.image.entity.ProgramImage;
import com.codestates.team5.dailyclub.image.repository.ProgramImageRepository;
import com.codestates.team5.dailyclub.program.dto.SearchFilterDto;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.program.repository.ProgramRepository;
import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ProgramService {

    private final ProgramRepository programRepository;
    private final UserRepository userRepository;
    private final ProgramImageRepository programImageRepository;

    /**
     * 1. loginUserId로 User 엔티티 Proxy 조회
     * 2. Program 등록
     * 3. ProgramImage 등록
     */
    public Program createProgram(Long loginUserId, Program program, ProgramImage programImage) {
        //User를 DB에 직접 조회하지 않고, proxy로 가져옴
        User user = userRepository.getReferenceById(loginUserId);
        log.info("userReferenceById : {}", user.getClass()); //User$HibernateProxy$~

        //유저 Entity 연관관계 설정
        program.setUser(user);

        //Program 등록
        Program createdProgram = programRepository.save(program);

        //ProgramImage Entity 연관관계 설정 (양방향)
        programImage.setProgram(createdProgram);

        //ProgramImage 등록
        programImageRepository.save(programImage);

        return createdProgram;
    }

    public void deleteProgram(Long programId) {

    }

    public Program findProgram(Long programId) {
        return programRepository.findById(programId)
                    .orElseThrow(() ->
                        new RuntimeException("존재하지 않는 프로그램입니다.")
                    );
    }

    public Page<Program> findPrograms(int page, int size, SearchFilterDto searchFilterDto) {
        return null;
    }


}
