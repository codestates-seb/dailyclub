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

    @Bean
    public WebSecurityCustomizer configure() {
        return (web) ->web.ignoring().antMatchers(
                "/h2/**", "/api/users", "/swagger-ui.html"
        );
    }




    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //csfr 보호를 해제한다.
                .csrf().disable()
                // 세션 인증 방식이 아니기에 세션 생성을 막아놓는다.
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .httpBasic().disable()
                .apply(new CustomLogin())
                .and()
                .authorizeRequests()
                .antMatchers("/api/mypages/**").access("hasRole('ADMIN')")
                .anyRequest().permitAll()
                .and()
                .logout()
                .logoutSuccessUrl("/");
        return http.build();
    }

    public class CustomLogin extends AbstractHttpConfigurer<CustomLogin, HttpSecurity> {
        @Override
        public void configure(HttpSecurity httpSecurity) throws Exception {
            AuthenticationManager authenticationManager = httpSecurity.getSharedObject(AuthenticationManager.class);
            httpSecurity.addFilter(new JwtAuthenticationFilter(authenticationManager))
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository));
        }
    }

}
