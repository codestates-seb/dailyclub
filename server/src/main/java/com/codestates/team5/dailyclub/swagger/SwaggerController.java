package com.codestates.team5.dailyclub.swagger;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/docs")
public class SwaggerController {
    //Swagger 문서 주소 리다이렉트
    @GetMapping
    public String api() {
        return "redirect:/swagger-ui.html";
    }
}
