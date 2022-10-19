package com.codestates.team5.dailyclub.notification.event;

import com.codestates.team5.dailyclub.notification.entity.Notification;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class NotificationEvent extends ApplicationEvent {
    private final Long userId;
    private final Long programId;
    private final Notification.NotificationType type;

    public NotificationEvent(Object source,
                             Long userId,
                             Long programId,
                             Notification.NotificationType type) {
        super(source);
        this.userId = userId;
        this.programId = programId;
        this.type = type;
    }

}
