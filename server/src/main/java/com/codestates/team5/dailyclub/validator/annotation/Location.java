package com.codestates.team5.dailyclub.validator.annotation;

import com.codestates.team5.dailyclub.validator.validator.LocationValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = LocationValidator.class)
public @interface Location {
    String message() default "올바른 지역명을 입력해야 합니다. (서울, 경기, 강원, 인천, 대전/충청, 대구/경북, 부산/울산/경남, 광주/전라, 제주)";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
