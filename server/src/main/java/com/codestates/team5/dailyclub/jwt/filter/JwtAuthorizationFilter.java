package com.codestates.team5.dailyclub.jwt.filter;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.codestates.team5.dailyclub.jwt.TokenProvider;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private UserRepository userRepository;
    private TokenProvider tokenProvider;
    private final Logger logger = LoggerFactory.getLogger(JwtAuthorizationFilter.class);

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, TokenProvider tokenProvider) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, SecurityException, ServletException {
        logger.info("인증이나 권한 필요한 주소가 요청 되었습니다.");
        // 헤더에서 액세스 토큰을 받아온다.
        String jwtToken = resolveToken(request ,"Authorization");
        // 토큰이 존재한다면
        if(jwtToken != null) {
            // 토큰을 검증하고, 그 검증 후 값을 저장해둔다.
            TokenProvider.JwtCode accValidResult = tokenProvider.validateToken(jwtToken, "access");
            // 액세스 토큰이 유효하다면
            if(accValidResult == TokenProvider.JwtCode.ACCESS) {
                // 인증 객체를 얻어 SecurityContextHolder에 저장 후, 필터를 넘긴다.
                Authentication authentication = tokenProvider.getAuthentication(jwtToken);
                if(authentication != null) {
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    filterChain.doFilter(request, response);
                }
                // 액세스 토큰이 만료되었다면
            } else if (accValidResult == TokenProvider.JwtCode.EXPIRED) {
                // 리프레시 토큰을 헤더에서 불러온다.
                String refreshToken = resolveToken(request, "Refresh");
                // refresh Token이 요청헤더에 있다면
                if(refreshToken != null) {
                    // refresh Token을 검증
                    TokenProvider.JwtCode refValidResult = tokenProvider.validateToken(refreshToken, "Refresh");
                    // 검증이 통과하면
                    if(refValidResult != TokenProvider.JwtCode.DENIED) {
                        // refresh Token 재발급
//                        String newRefreshToken = tokenProvider.updateRefreshToken(refreshToken);
//                        if(newRefreshToken != null) {
//                            response.addHeader("Refresh", "Bearer " + refreshToken);
                        // Access Token 재발급
                        Authentication authentication = tokenProvider.getAuthentication(refreshToken);
                        response.addHeader("Authorization", "Bearer " + tokenProvider.createAccessToken(authentication));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        logger.info("액세스 토큰 최신화 완료");
                        filterChain.doFilter(request, response);
//                        }
                    }else if(refValidResult == TokenProvider.JwtCode.EXPIRED) {
                        String newRefreshToken = tokenProvider.updateRefreshToken(refreshToken);
                        response.addHeader("Refresh", "Bearer " + refreshToken);
                        logger.info("리프레시토큰 최신화 완료");
                        filterChain.doFilter(request, response);
                    }
                } else
                    // refresh Token이 요청헤더에 없다면
                    // 클라이언트에 Access Token이 만료되었음을 알리고, refresh Token을 요청헤더에 달라고 요청(예외 처리)
                    // 해당 처리는 아래에서 구현할 ErrorhandlerFilter 클래스에서 처리한다.
                    throw new TokenExpiredException("토큰 만료", Instant.now());
            }
        } else {
            logger.info("유효한 토큰을 찾지 못하였습니다, uri : {}", request.getRequestURI());

            filterChain.doFilter(request, response);
        }
    }


    // 토큰을 헤더에서 불러오는 메서드
    private String resolveToken(HttpServletRequest request, String header) {
        String jwtHeader = request.getHeader(header);

        if(jwtHeader != null && jwtHeader.startsWith("Bearer ")) {
            return jwtHeader.replace("Bearer ", "");
        }
        return null;
    }
}