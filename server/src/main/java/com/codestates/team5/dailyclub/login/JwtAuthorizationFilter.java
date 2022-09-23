package com.codestates.team5.dailyclub.login;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private UserRepository userRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, SecurityException, ServletException {
        System.out.println("인증이나 권한 필요한 주소 요청 됨");

        String jwtHeader = request.getHeader("Authorization");
        if(jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
            filterChain.doFilter(request,response);
            return;
        }

        String jwtToken = jwtHeader.replace("Bearer", "");
        String loginId = JWT.require(Algorithm.HMAC512("todo jwt token")).build().verify(jwtToken).getClaim("loginId").asString();

        if(loginId != null) {
            User userEntity = userRepository.findByLoginId(loginId);
            PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            filterChain.doFilter(request,response);
        }
        else {super.doFilterInternal(request,response,filterChain);}

    }

}
