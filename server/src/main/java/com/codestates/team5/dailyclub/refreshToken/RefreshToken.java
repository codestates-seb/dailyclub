package com.codestates.team5.dailyclub.refreshToken;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String loginId;

    @Column
    private String token;

    public static RefreshToken createToken(String loginId, String token) {
        return RefreshToken.builder()
                .loginId(loginId)
                .token(token)
                .build();
    }

    public void changeToken(String token) {
        this.token = token;
    }

}
