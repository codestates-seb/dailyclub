package com.codestates.team5.dailyclub.jwt.filter;

import com.codestates.team5.dailyclub.jwt.TokenProvider;
import com.codestates.team5.dailyclub.user.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter { //인증 처리 클래스

    //실제 Authentication을 만들고 인증을 처리하는 인터페이스
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("로그인 시도");

        try {
            //JSON 형식을 사용 할 때 응답들을 직렬화하고, 요청들을 역직렬화 할 때 사용하며 spring-boot-stater-web에 기본적으로 Jackson 라이브러리가 있다.
            ObjectMapper objectMapper = new ObjectMapper();
            User user = objectMapper.readValue(request.getInputStream(), User.class);
//            String loginId = request.getParameter("loginId");
//            String password = request.getParameter("password");
//            LoginId와 Password를 조합해서 Security가 알아볼 수 잇는 UsernamePasswordAuthenticationToken 만든다.
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getLoginId(), user.getPassword());
//            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginId, password);
            //AuthenticationManager에 token을 넘기면 UserDetailService가 받아 처리하도록 하다.
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            return authentication;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain, Authentication authentication) throws  IOException, SecurityException {
        logger.info(("로그인 성공 유저 처리"));
        String accessToken = tokenProvider.createAccessToken(authentication);
        String refreshToken = tokenProvider.renewalRefreshToken(authentication);
        response.addHeader("Authorization", "Bearer" + accessToken);
        response.addHeader("refresh", "Bearer" + refreshToken);
    }
}
