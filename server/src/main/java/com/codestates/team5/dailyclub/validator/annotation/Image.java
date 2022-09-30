package com.codestates.team5.dailyclub.validator.annotation;

import com.codestates.team5.dailyclub.validator.validator.ImageValidator;
import com.codestates.team5.dailyclub.validator.validator.TodayOrAfterValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ImageValidator.class)
public @interface Image {
    String message() default "이미지 파일만 업로드 가능합니다.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
