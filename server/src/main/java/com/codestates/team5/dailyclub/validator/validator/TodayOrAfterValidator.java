package com.codestates.team5.dailyclub.validator.validator;

import com.codestates.team5.dailyclub.validator.annotation.TodayOrAfter;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDate;

public class TodayOrAfterValidator implements ConstraintValidator<TodayOrAfter, LocalDate> {
    @Override
    public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
        //오늘 날짜
        LocalDate now = LocalDate.now();

        //오늘 날짜이거나 그 이후면 true
        //null 허용
        return (value == null) ||
               (value.isAfter(now) || value.isEqual(now));
    }
}
