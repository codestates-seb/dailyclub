package com.codestates.team5.dailyclub.user.entity;


import com.codestates.team5.dailyclub.common.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

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
    private String picture;

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


}

