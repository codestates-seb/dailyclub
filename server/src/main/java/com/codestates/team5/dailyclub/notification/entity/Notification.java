package com.codestates.team5.dailyclub.notification.entity;

import com.codestates.team5.dailyclub.common.audit.Auditable;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Notification extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id")
    private Program program;

    @Enumerated(EnumType.STRING)
    @NotNull
    private NotificationType notificationType;

    @Enumerated(EnumType.STRING)
    @NotNull
    private StatusRead statusRead = StatusRead.UNREAD;

    //알림 읽음 표시 메서드
    public void changeStatusRead() {
        this.statusRead = StatusRead.READ;
    }

    //알림 읽었는지 여부
    @Getter
    public enum StatusRead {
        READ("READ"), UNREAD("UNREAD");

        private String status;

        StatusRead(String status) {
            this.status = status;
        }
    }

    /**
     * 알림 종류
     * - UPDATE : 신청한 프로그램 변경 사항 있을 때
     * - DDAY : 신청한 프로그램 시작 당일일 때
     * - COMPLETE : 프로그램 신청 완료했을 때
     */
    @Getter
    public enum NotificationType {
        UPDATE("UPDATE"), DDAY("DDAY"), APPLY_COMPLETE("APPLY_COMPLETE");

        private String type;

        NotificationType(String type) {
            this.type = type;
        }
    }

}

