package com.codestates.team5.dailyclub.user.repository;

import com.codestates.team5.dailyclub.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository <User, Long> {
}
