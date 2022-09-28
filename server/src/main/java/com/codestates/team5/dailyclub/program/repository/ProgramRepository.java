package com.codestates.team5.dailyclub.program.repository;

import com.codestates.team5.dailyclub.program.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository <Program, Long>, ProgramRepositoryCustom {
}
