package com.codestates.team5.dailyclub.message.repository;

import com.codestates.team5.dailyclub.message.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository <Message, Long> {
}
