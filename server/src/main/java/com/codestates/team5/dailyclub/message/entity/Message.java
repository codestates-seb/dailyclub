package com.codestates.team5.dailyclub.message.entity;

import com.codestates.team5.dailyclub.common.audit.Auditable;
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
public class Message extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user_id")
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user_id")
    private User toUser;

    @NotNull
    private String text;

    @Enumerated(value = EnumType.STRING)
    private Message.readStatus readStatus;



    public enum readStatus {
        READ("READ"),
        UNREADN("UNREAD");

        private String readStatus;
        readStatus(String readStatus) {
            this.readStatus = readStatus;
        }

        public String getReadStatus() {
            return this.readStatus;
        }
    }





}

