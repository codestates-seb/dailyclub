package com.codestates.team5.dailyclub.validator.validator;

import com.codestates.team5.dailyclub.user.dto.UserDto;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import com.codestates.team5.dailyclub.validator.annotation.Unique;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@RequiredArgsConstructor
@Slf4j
public class UniqueValidator implements ConstraintValidator<Unique, String> {

    private final UserRepository userRepository;
    private String fieldName;

    @Override
    public void initialize(Unique unique) {
        this.fieldName = unique.value();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        log.info("[UniqueValidator] 동작 = {}", fieldName);
        switch (fieldName) {
            case "loginId" :
                return !userRepository.existsByLoginId(value);
            case "nickname" :
                return !userRepository.existsByNickname(value);
            case "email" :
                return !userRepository.existsByEmail(value);
        }
        return false;
    }
}
