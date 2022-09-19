package com.codestates.team5.dailyclub.program.entity;

import com.codestates.team5.dailyclub.common.audit.Auditable;
import com.codestates.team5.dailyclub.location.entity.Location;
import com.codestates.team5.dailyclub.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Program extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    private String title;

    @NotNull
    private String text;

    @NotNull
    private Integer numApply;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @NotNull
    private LocalDateTime programDate;

//  수정 예정
    private String picture;

    @NotNull
    private Integer minKind;

    @Enumerated(value = EnumType.STRING)
    private ProgramStatus status;

    public enum ProgramStatus {
        POSSIBLE,
        IMMINENT,
        IMPOSSIBLE;

    }

}

