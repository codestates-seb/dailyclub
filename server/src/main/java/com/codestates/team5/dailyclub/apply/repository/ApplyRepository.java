package com.codestates.team5.dailyclub.apply.repository;

import com.codestates.team5.dailyclub.apply.entity.Apply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplyRepository extends JpaRepository<Apply, Long> {
    @Query("select a from Apply a where a.program.id = :programId")
    Page<Apply> findAllByProgramId(PageRequest pageRequest, @Param("programId") Long programId);

    @Query("select a from Apply a where a.program.id = :programId")
    List<Apply> findByProgramId(@Param("programId") Long programId);

    @Query("select a from Apply a where a.user.id = :userId")
    Page<Apply> findAllByUserId(PageRequest pageRequest, @Param("userId") Long userId);
}
