package com.codestates.team5.dailyclub.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.codestates.team5.dailyclub.refreshToken.RefreshToken;
import com.codestates.team5.dailyclub.refreshToken.RefreshTokenRepository;
import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Component
public class TokenProvider {
    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
    private final RefreshTokenRepository refreshTokenRepository;
    private UserRepository userRepository;

    public TokenProvider(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    //비밀 키 값 불러오기
    @Value("{jwt.secret}")
    private String accessKey;
    //refreshkey와 accesskey 구분하기
    private String refreshKey = "refresh " + accessKey;

    //accessToken 생성 메서드
    public String createAccessToken(Authentication authentication) {

        AuthDetails authDetails = (AuthDetails) authentication.getPrincipal();

        return JWT.create()
                .withSubject("JWT Access Token")
                .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 30)))
                .withClaim("id", authDetails.getUser().getId())
                .withClaim("loginId", authDetails.getUsername())
                .sign(Algorithm.HMAC512(accessKey));
    }

    //refreshToken 생성 메서드
    private String createRefreshToken(Authentication authentication) {
        AuthDetails authDetails = (AuthDetails) authentication.getPrincipal();

        return JWT.create()
                .withSubject("JWT Refresh Token")
                .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 60 * 24 * 14)))
                .withClaim("loginId", authDetails.getUsername())
                .sign(Algorithm.HMAC512(refreshKey));
    }

    //refreshToken 을 만들어서 넣어주고 있으면 바꿔주는 메서드
    @Transactional
    public String renewalRefreshToken(Authentication authentication) {
        String newRefreshToken = createRefreshToken(authentication);
        refreshTokenRepository.findByLoginId(authentication.getName())
                .ifPresentOrElse(
                        refreshToken -> {refreshToken.changeToken(newRefreshToken);
                            logger.info("기존 리프레시 토큰 변환");},
                        () -> {
                            RefreshToken toSaveToken = RefreshToken.createToken(authentication.getName(), newRefreshToken);
                            logger.info("새로운 리프레시 토큰 저장 | member's loginId : {}, token : {}", toSaveToken.getLoginId(), toSaveToken.getToken() );
                            refreshTokenRepository.save(toSaveToken);
                        }
                );
        return newRefreshToken;
    }

    //accessToken 만료시 refresh 토큰 값을 비교해서 같으면 생성 후 반환 메서드
    @Transactional
    public String updateRefreshToken(String refreshToken) throws RuntimeException {
        // refresh Token을 DB에 저장된 토큰과 비교
        Authentication authentication = getAuthentication(refreshToken);
        RefreshToken findRefreshToken = refreshTokenRepository.findByLoginId(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("loginId : " + authentication.getName() + " was not found"));

        // 토큰이 일치한다면
        if(findRefreshToken.getToken().equals(refreshToken)) {
            // 새로운 토큰 생성
            String newRefreshToken = createRefreshToken(authentication);
            findRefreshToken.changeToken(newRefreshToken);
            return newRefreshToken;
        } else {
            logger.info("refresh Token이 일치하지 않습니다.");
            return null;
        }
    }

    public Authentication getAuthentication(String token) {

        String loginId = JWT.decode(token).getClaim("loginId").asString();

        if(loginId != null) {
            User userEntity = userRepository.findByLoginId(loginId).orElseThrow(
                    () -> new UsernameNotFoundException(loginId + "데이터베이스에서 찾을 수 없습니다.")
            );

            AuthDetails authDetails = new AuthDetails(userEntity);

            return new UsernamePasswordAuthenticationToken(authDetails, null, authDetails.getAuthorities());
        } else {
            return null;
        }
    }


    //인자로 들어온 토큰을 검증하는 메서드
    public JwtCode validateToken(String token, String tokenType) {
        String key = tokenType.equals("access") ? accessKey : refreshKey;

        try {
            JWT.require(Algorithm.HMAC512(key)).build().verify(token);
            return JwtCode.ACCESS;
        } catch (TokenExpiredException e) {
            logger.info("만료된 토큰입니다.");
            return JwtCode.EXPIRED;
        } catch (JWTVerificationException e) {
            logger.info("토큰 검증에 실패하였습니다.");
            return JwtCode.DENIED;
        }
    }

    public static enum JwtCode {
        DENIED,
        ACCESS,
        EXPIRED;
    }
}