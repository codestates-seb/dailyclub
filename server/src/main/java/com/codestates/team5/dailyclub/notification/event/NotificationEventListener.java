package com.codestates.team5.dailyclub.notification.event;

import com.codestates.team5.dailyclub.emitter.service.EmitterService;
import com.codestates.team5.dailyclub.notification.repository.NotificationRepository;
import com.codestates.team5.dailyclub.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@Slf4j
@RequiredArgsConstructor
public class NotificationEventListener implements ApplicationListener<NotificationEvent> {

    private final NotificationService notificationService;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Override
    public void onApplicationEvent(NotificationEvent event) {
        log.info(
            "[NotificationEvent Listening] userId={}, programId={}, type={}",
            event.getUserId(),
            event.getProgramId(),
            event.getType()
        );

        notificationService.createNotification(event.getUserId(),
                                                event.getProgramId(),
                                                event.getType());
    }
}
