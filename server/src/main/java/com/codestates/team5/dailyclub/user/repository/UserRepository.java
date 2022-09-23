package com.codestates.team5.dailyclub.user.repository;

import com.codestates.team5.dailyclub.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository <User, Long> {
    @Query("select u from User u where u.loginId = :loginId")
    User findByLoginId(@Param("loginId") String loginId);

}
