package com.codestates.team5.dailyclub.notification.event;

import com.codestates.team5.dailyclub.notification.entity.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class NotificationEventPublisher {

    private final ApplicationEventPublisher applicationEventPublisher;

    public void publish(Long userId, Long programId, Notification.NotificationType type) {
        log.info(
            "[NotificationEvent Publishing] userId={}, programId={}, type={}",
            userId,
            programId,
            type
        );
        NotificationEvent event
            = new NotificationEvent(this, userId, programId, type);

        applicationEventPublisher.publishEvent(event);
    }

}
