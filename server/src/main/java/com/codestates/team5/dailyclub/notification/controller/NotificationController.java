package com.codestates.team5.dailyclub.notification.controller;

import com.codestates.team5.dailyclub.common.dto.MultiResponseDto;
import com.codestates.team5.dailyclub.notification.dto.NotificationDto;
import com.codestates.team5.dailyclub.notification.entity.Notification;
import com.codestates.team5.dailyclub.notification.mapper.NotificationMapper;
import com.codestates.team5.dailyclub.notification.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "알림 API")
@Slf4j
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final NotificationMapper notificationMapper;

    @Operation(summary = "알림 리스트 조회")
    @ApiResponses(
        @ApiResponse(
            responseCode = "200",
            description = "OK"
        )
    )
    @GetMapping
    public ResponseEntity<MultiResponseDto<NotificationDto.Response>> getNotifications(@Parameter(description = "페이지 번호") @RequestParam  int page,
                                                                                       @Parameter(description = "한 페이지당 알림 수") @RequestParam int size) {
        Long loginUserId = 1L;
        Page<Notification> pageNotifications = notificationService.findNotifications(page-1, size, loginUserId);
        List<Notification> notifications = pageNotifications.getContent();
        List<NotificationDto.Response> responses = notificationMapper.notificationsToNotificationResponseDtos(notifications);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageNotifications), HttpStatus.OK);
    }

    @Operation(summary = "알림 읽음으로 표시")
    @ApiResponses(
        @ApiResponse(
            responseCode = "200",
            description = "OK"
        )
    )
    @PatchMapping("/{notificationId}")
    public void updateStatusRead(@PathVariable("notificationId") Long id) {
        notificationService.updateStatusRead(id);
    }

    @Operation(summary = "알림 삭제")
    @ApiResponses(
        @ApiResponse(
            responseCode = "204",
            description = "NO CONTENT")
    )
    @DeleteMapping("/{notificationId}")
    public void deleteNotification(@PathVariable("notificationId") Long id) {
        notificationService.deleteNotification(id);
    }


}
