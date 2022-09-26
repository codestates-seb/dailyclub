package com.codestates.team5.dailyclub.notification.mapper;

import com.codestates.team5.dailyclub.notification.dto.NotificationDto;
import com.codestates.team5.dailyclub.notification.entity.Notification;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface NotificationMapper {

    default NotificationDto.Response notificationToNotificationResponseDto(Notification notification) {
        return NotificationDto.Response.builder()
                .id(notification.getId())
                .programId(notification.getProgram().getId())
                .title(notification.getProgram().getTitle())
                .status(notification.getStatusRead().getStatus())
                .type(notification.getNotificationType().getType())
                .build();
    }

    default List<NotificationDto.Response> notificationsToNotificationResponseDtos(List<Notification> notifications) {
        return notifications.stream()
                .map(this::notificationToNotificationResponseDto)
                .collect(Collectors.toList());
    }
}
