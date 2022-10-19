package com.codestates.team5.dailyclub.validator.annotation;

import com.codestates.team5.dailyclub.validator.validator.LocationValidator;
import com.codestates.team5.dailyclub.validator.validator.ProgramStatusValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ProgramStatusValidator.class)
public @interface ProgramStatus {
    String message() default "올바른 프로그램 상태를 입력해야 합니다. (모집중, 마감임박, 마감)";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
