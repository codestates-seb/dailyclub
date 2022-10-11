package com.codestates.team5.dailyclub.notification.service;

import com.codestates.team5.dailyclub.notification.entity.Notification;
import com.codestates.team5.dailyclub.notification.repository.NotificationRepository;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.program.repository.ProgramRepository;
import com.codestates.team5.dailyclub.throwable.entity.BusinessLogicException;
import com.codestates.team5.dailyclub.throwable.entity.ExceptionCode;
import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.codestates.team5.dailyclub.throwable.entity.ExceptionCode.PROGRAM_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final ProgramRepository programRepository;

    public Notification createNotification(Long userId, Long programId, Notification.NotificationType type) {
        //유저 존재 확인
        User userById = userRepository.findById(userId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
        );
        //프로그램 존재 확인
        Program programById = programRepository.findById(programId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.PROGRAM_NOT_FOUND)
        );

        Notification notification = Notification.builder()
                                        .user(userById)
                                        .program(programById)
                                        .notificationType(type)
                                        .build();

        return notificationRepository.save(notification);
    }

    public Page<Notification> findNotifications(int page, int size, Long loginUserId) {
        //유저 존재 확인
        User userById = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
        );

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return notificationRepository.findByUserId(pageRequest, loginUserId);
    }

    public void updateStatusRead(Long loginUserId, Long notificationId) {
        //유저 존재 확인
        User userById = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
        );
        //알림 존재 확인
        Notification notificationById = notificationRepository.findById(notificationId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.NOTIFICATION_NOT_FOUND)
        );
        //본인의 알람을 읽은 것인지 확인
        if (!notificationById.getUser().getId().equals(loginUserId)) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_READ_OTHERS_NOTIFICATION);
        }

        notificationById.changeStatusRead();
    }

    public long countUnreadNotifications(Long loginUserId) {
        //유저 존재 확인
        User userById = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
        );
        return notificationRepository.countByUserAndStatusRead(userById, Notification.StatusRead.UNREAD);
    }
}
