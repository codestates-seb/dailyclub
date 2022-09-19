package com.codestates.team5.dailyclub.notification.repository;

import com.codestates.team5.dailyclub.notification.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NotificationRepository extends JpaRepository <Notification, Long> {
    @Query("select n from Notification n where n.user.id = :userId order by n.id desc")
    Page<Notification> findByUserId(PageRequest pageRequest, @Param("userId") Long userId);

}
