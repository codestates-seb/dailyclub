package com.codestates.team5.dailyclub.validator.annotation;

import com.codestates.team5.dailyclub.validator.validator.UniqueValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueValidator.class)
public @interface Unique {
    String message() default "중복된 값입니다.";
    String value();
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
