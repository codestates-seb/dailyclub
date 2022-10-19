package com.codestates.team5.dailyclub.program.repository;

import com.codestates.team5.dailyclub.program.entity.Program;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProgramRepository extends JpaRepository <Program, Long>, ProgramRepositoryCustom {

    @Query("select p from Program p where p.user.id = :userId")
    Page<Program> findByUserId(Pageable pageable, Long userId);
}
