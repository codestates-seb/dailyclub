package com.codestates.team5.dailyclub.login;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.codestates.team5.dailyclub.user.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter { //인증 처리 클래스

    //실제 Authentication을 만들고 인증을 처리하는 인터페이스
    private final AuthenticationManager authenticationManager;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("로그인 시도");

        try {
            //JSON 형식을 사용 할 때 응답들을 직렬화하고, 요청들을 역직렬화 할 때 사용하며 spring-boot-stater-web에 기본적으로 Jackson 라이브러리가 있다.
            ObjectMapper objectMapper = new ObjectMapper();
            User user = objectMapper.readValue(request.getInputStream(),User.class);
            //LoginId와 Password를 조합해서 Security가 알아볼 수 잇는 UsernamePasswordAuthenticationToken 만들기
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getLoginId(), user.getPassword());
            //AuthenticationManager에 token을 넘기면 UserDetailService가 받아 처리하도록 하다.
            //authenticationManger는 알아서 PrincipalDetailsService를 호출한다.
            //authentication 안에 인증이 됐는지 안됐는지가 들어있다.
            //token에 있는 유저정보에 대한 인증을 한다.
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            //authentication 객체를 return 한다.
            return authentication;
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain, Authentication authentication) throws  IOException, SecurityException {
        System.out.println("인증 성공 유저 처리");
        //인증이 성공한 유저의 정보를 저장한다.
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal(); //권한을 가져와서 principalDetails 에 넣기
        //JWT토큰을 생성하여 Response 헤더에 추가한다.
        String jwtToken = JWT.create()
                .withSubject("todo jwt token")
                .withExpiresAt(new Date(System.currentTimeMillis() + (1440 * 60 * 1000)))
                .withClaim("id", principalDetails.getUser().getId())
                .withClaim("loginId", principalDetails.getUser().getLoginId())
                .sign(Algorithm.HMAC512("todo jwt token"));
        response.addHeader("Authorization", "Bearer" + jwtToken);
    }
}
