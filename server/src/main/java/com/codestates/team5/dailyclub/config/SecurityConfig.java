package com.codestates.team5.dailyclub.config;

import com.codestates.team5.dailyclub.login.JwtAuthenticationFilter;
import com.codestates.team5.dailyclub.login.JwtAuthorizationFilter;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserRepository userRepository;

    //Spring Security에서 제공하는 비밀번호 암호화 객체
    //회원 비밀번호 등록시 해당 메서드를 이용하여 암호화해야 로그인 처리시 동일한 해시로 비교한다.
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Bean
    public WebSecurityCustomizer configure() {
        return (web) ->web.ignoring().antMatchers(
                "/h2/**", "/api/users", "/swagger-ui.html"
        );
    }




    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()//csfr 보호를 해제한다.
//                .cors().and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 인증 방식이 아니기에 세션 생성을 막아놓는다.
                .and()
                .httpBasic().disable()
                .apply(new CustomLogin())
                .and()
                .authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .logout()
                .logoutSuccessUrl("/");
        return http.build();
    }

    //체인도 추가하게 된다.
    public class CustomLogin extends AbstractHttpConfigurer<CustomLogin, HttpSecurity> {
        @Override
        public void configure(HttpSecurity httpSecurity) throws Exception {
            AuthenticationManager authenticationManager = httpSecurity.getSharedObject(AuthenticationManager.class);
            httpSecurity.addFilter(new JwtAuthenticationFilter(authenticationManager))
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository));
        }
    }

}
