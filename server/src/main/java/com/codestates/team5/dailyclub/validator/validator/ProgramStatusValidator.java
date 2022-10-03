package com.codestates.team5.dailyclub.validator.validator;

import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.validator.annotation.ProgramStatus;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.EnumSet;

public class ProgramStatusValidator  implements ConstraintValidator<ProgramStatus, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        //Program.ProgramStatus 일치하는 상태가 있는지 여부
        //null 허용
        return (value == null) ||
               EnumSet.allOf(Program.ProgramStatus.class).stream()
                        .anyMatch(programStatus -> programStatus.getDescription().equals(value));
    }
}
