package com.codestates.team5.dailyclub.notice.repository;

import com.codestates.team5.dailyclub.notice.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository <Notice, Long> {
}
