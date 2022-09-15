package com.codestates.team5.dailyclub.notification.repository;

import com.codestates.team5.dailyclub.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository <Notification, Long> {
}
