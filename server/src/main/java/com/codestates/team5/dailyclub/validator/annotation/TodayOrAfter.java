package com.codestates.team5.dailyclub.validator.annotation;

import com.codestates.team5.dailyclub.validator.validator.TodayOrAfterValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TodayOrAfterValidator.class)
public @interface TodayOrAfter {
    String message() default "오늘보다 이전 날짜를 고를 수 없습니다.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
