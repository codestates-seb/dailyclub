package com.codestates.team5.dailyclub.user.entity;

import com.codestates.team5.dailyclub.common.audit.Auditable;
import com.codestates.team5.dailyclub.image.entity.ProgramImage;
import com.codestates.team5.dailyclub.image.entity.UserImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotNull
    @Column(unique = true)
    private String loginId;

    @NotNull
    @Column(unique = true)
    private String nickname;

    @Email
    private String email;

    @NotNull
    private String password;

//  수정 예정
    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<UserImage> userImages = new ArrayList<>();

    private String introduction;

    private Integer kind;

    @Enumerated(value = EnumType.STRING)
    private Role role;



    public enum Role {
        USER("ROLE_USER"),
        ADMIN("ROLE_ADMIN");

        private String role;
        Role(String role) {
            this.role = role;
        }
        public String getRole() {
            return this.role;
        }
    }

    public void updateAll(String nickname, String introduction) {
        this.nickname = nickname;
        this.introduction = introduction;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public void updateKind(Integer score) {
        int newKind = this.kind + score;
        //최대 100점, 최소 0점
        this.kind = (newKind>100)? 100 : (newKind<0)? 0 : newKind;
    }

}

