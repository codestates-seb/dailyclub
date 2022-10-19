package com.codestates.team5.dailyclub.validator.validator;

import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.validator.annotation.Location;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.EnumSet;

public class LocationValidator implements ConstraintValidator<Location, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        //Program.Location에 일치하는 지역이 있는지 여부
        //null 허용
        return (value == null) ||
               EnumSet.allOf(Program.Location.class).stream()
                        .anyMatch(location -> location.getDescription().equals(value));
    }
}
