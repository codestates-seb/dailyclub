package com.codestates.team5.dailyclub.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final String[] ALLOWED_ORIGINS = {
        "http://localhost:3000",
        "http://stackoverflow-bucket-codestates-5.s3-website.ap-northeast-2.amazonaws.com/"
    };

    private final String[] ALLOWED_METHODS = {
        "GET", "POST", "PATCH", "DELETE", "OPTIONS"
    };

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins(ALLOWED_ORIGINS)
            .allowedMethods(ALLOWED_METHODS) //preflight OPTIONS method 허용
            .allowCredentials(true);
    }
}
