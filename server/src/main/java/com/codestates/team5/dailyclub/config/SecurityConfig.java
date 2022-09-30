package com.codestates.team5.dailyclub.config;

import com.codestates.team5.dailyclub.jwt.*;
import com.codestates.team5.dailyclub.jwt.filter.ErrorHandlerFilter;
import com.codestates.team5.dailyclub.jwt.filter.JwtAuthenticationFilter;
import com.codestates.team5.dailyclub.jwt.filter.JwtAuthorizationFilter;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

//    private final CorsFilter corsFilter;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final TokenProvider tokenProvider;
    private final ErrorHandlerFilter errorHandlerFilter;
    private final UserRepository userRepository;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer configure() {
        return (web) ->web.ignoring().antMatchers(
                "/h2/**", "/api/docs"
        );
    }




    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //csfr 보호를 해제한다.
                .csrf().disable()
                .cors().configurationSource(configurationSource());
                // 세션 인증 방식이 아니기에 세션 생성을 막아놓는다.
        http
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .httpBasic().disable()
                .apply(new JwtLogin())
                .and()
                .addFilterBefore(errorHandlerFilter, JwtAuthorizationFilter.class)
                .exceptionHandling()
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/programs/**").access("hasRole('USER')")
                .antMatchers(HttpMethod.PATCH,"/api/programs/**").access("hasRole('USER')")
                .antMatchers(HttpMethod.DELETE,"/api/programs/**").access("hasRole('USER')")
                .anyRequest().permitAll()
                .and()
                .logout()
                .logoutSuccessUrl("/api/programs");
        return http.build();
    }

    public class JwtLogin extends AbstractHttpConfigurer<JwtLogin, HttpSecurity> {
        @Override
        public void configure(HttpSecurity http) throws Exception {
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            http
                    .addFilter(new JwtAuthenticationFilter(authenticationManager, tokenProvider))
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository, tokenProvider));
        }
    }
    @Bean
    public CorsConfigurationSource configurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
