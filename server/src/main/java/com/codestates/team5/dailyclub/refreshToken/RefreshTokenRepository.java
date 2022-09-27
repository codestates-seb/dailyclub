package com.codestates.team5.dailyclub.refreshToken;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {

    Optional<RefreshToken> findByLoginId(String loginId);

    void deleteByLoginId(String LoginId);
}
