package com.codestates.team5.dailyclub.apply.entity;

import com.codestates.team5.dailyclub.common.audit.Auditable;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Apply extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id")
    private Program program;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Apply.ReviewStatus reviewStatus = ReviewStatus.UNREVIEWED;

    @Getter
    @AllArgsConstructor
    public enum ReviewStatus {
        REVIEWED("REVIEWED"), UNREVIEWED("UNREVIEWED");

        private final String status;
    }

    public void updateReviewStatus() {
        this.reviewStatus = ReviewStatus.REVIEWED;
    }

}
