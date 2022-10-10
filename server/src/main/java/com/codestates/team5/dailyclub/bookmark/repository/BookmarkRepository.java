package com.codestates.team5.dailyclub.bookmark.repository;

import com.codestates.team5.dailyclub.bookmark.entity.Bookmark;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository <Bookmark, Long> {
    boolean existsByUserAndProgram(User userById, Program programById);

    @Query("select b from Bookmark b where b.user.id = :userId")
    Page<Bookmark> findAllByUserId(PageRequest pageRequest, @Param("userId") Long userId);

    Bookmark findFirstByUserAndProgram(User userById, Program programById);

}
