package com.codestates.team5.dailyclub.program.service;

import com.codestates.team5.dailyclub.apply.entity.Apply;
import com.codestates.team5.dailyclub.apply.repository.ApplyRepository;
import com.codestates.team5.dailyclub.image.entity.ProgramImage;
import com.codestates.team5.dailyclub.image.repository.ProgramImageRepository;
import com.codestates.team5.dailyclub.image.util.ImageUtils;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ProgramService {

    private final ProgramRepository programRepository;
    private final UserRepository userRepository;
    private final ProgramImageRepository programImageRepository;
    private final ApplyRepository applyRepository;

    /**
     * 1. loginUserId로 User 엔티티 Proxy 조회
     * 2. Program 등록
     * 3. ProgramImage 등록
     */
    public Program createProgram(Long loginUserId, Program program, MultipartFile imageFile) throws IOException {
        //User를 DB에 직접 조회하지 않고, proxy로 가져옴
        User user = userRepository.getReferenceById(loginUserId);
        log.info("userReferenceById : {}", user.getClass()); //User$HibernateProxy$~

        //유저 Entity 연관관계 설정
        program.setUser(user);

        //Program 등록
        Program createdProgram = programRepository.save(program);

        if (!imageFile.isEmpty()) {
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

        //program persistence context 등록
        Program findProgram
            = programRepository.findById(programFromPatchDto.getId())
            .orElseThrow(() ->
                new RuntimeException("존재하지 않는 프로그램입니다.")
            );
        //programStatus 체크
        Program.ProgramStatus programStatus
            = checkProgramStatus(findProgram.getId(), programFromPatchDto.getNumOfRecruits());

        //program dirty checking
        findProgram.updateProgramStatus(programStatus);
        findProgram.updateProgram(programFromPatchDto);

        //programImage 처리
        /**
         *   등록 / 수정 시 이미지 존재 여부 (programImageId / imageFile null 여부로 판단)
         * 1. x      x  -> 아무 작업 x
         * 2. x      o  -> 이미지 새로 등록
         * 3. o      x  -> 기존 이미지 삭제
         * 4. o      o  -> 이미지 변경
         */
        if (programImageId == null && !imageFile.isEmpty()) {
            //2번 : 이미지 새로 등록
            ProgramImage programImage = ImageUtils.parseToProgramImage(imageFile);

            //ProgramImage Entity 연관관계 설정 (양방향)
            programImage.setProgram(findProgram);

            //ProgramImage 등록
            programImageRepository.save(programImage);
        } else if (programImageId != null && imageFile.isEmpty()){
            //3번 : 기존 이미지 삭제
            programImageRepository.deleteById(programImageId);
        } else if (programImageId != null && !imageFile.isEmpty()) {
            //4번 : 이미지 변경
            ProgramImage findProgramImage
                = programImageRepository.findById(programImageId)
                .orElseThrow(() ->
                    new RuntimeException("존재하지 않는 프로그램 이미지입니다.")
                );
            ProgramImage programImage = ImageUtils.parseToProgramImage(imageFile);

            //programImage dirty checking
            findProgramImage.updateProgramImage(programImage);
        }

        return findProgram;
    }

    public void deleteProgram(Long programId) {
        programRepository.deleteById(programId);
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

    //programStatus 체크
    public Program.ProgramStatus checkProgramStatus(Long programId, int numOfRecruits) {
        List<Apply> appliesByProgramId = applyRepository.findByProgramId(programId);
        int numOfApplicants = appliesByProgramId.size();
        long ratio = (long) numOfApplicants / numOfRecruits;
        if (ratio > 1) {
            throw new RuntimeException("현재 신청인원보다 적은 모집인원으로 설정할 수 없습니다.");
        } else if (ratio == 1) {
            return Program.ProgramStatus.IMPOSSIBLE;
        } else if (ratio >= 0.8 && ratio < 1) {
            return Program.ProgramStatus.IMMINENT;
        } else {
            return Program.ProgramStatus.POSSIBLE;
        }
    }


}
