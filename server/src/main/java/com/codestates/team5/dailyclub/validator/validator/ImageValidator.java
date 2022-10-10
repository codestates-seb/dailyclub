package com.codestates.team5.dailyclub.validator.validator;

import com.codestates.team5.dailyclub.validator.annotation.Image;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ImageValidator implements ConstraintValidator<Image, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) return false;
        return value.startsWith("image/");
    }
}
