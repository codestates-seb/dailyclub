package com.codestates.team5.dailyclub.notification.service;

import com.codestates.team5.dailyclub.notification.entity.Notification;
import com.codestates.team5.dailyclub.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public Page<Notification> findNotifications(int page, int size, Long loginUserId) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return notificationRepository.findByUserId(pageRequest, loginUserId);
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    public void updateStatusRead(Long id) {
        notificationRepository.findById(id)
                .ifPresent(Notification::changeStatusRead);
    }
}
