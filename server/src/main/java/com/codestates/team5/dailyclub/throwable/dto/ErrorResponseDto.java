package com.codestates.team5.dailyclub.throwable.dto;

import com.codestates.team5.dailyclub.throwable.entity.ExceptionCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class ErrorResponseDto {
    private int status;
    private String message;
    private List<FieldError> fieldErrors;
    private List<ConstraintViolationError> constraintViolationErrors;

    private ErrorResponseDto(int status, String message) {
        this.status = status;
        this.message = message;
    }

    private ErrorResponseDto(int status, String message,
                            List<FieldError> fieldErrors,
                            List<ConstraintViolationError> constraintViolationErrors) {
        this.status = status;
        this.message = message;
        this.fieldErrors = fieldErrors;
        this.constraintViolationErrors = constraintViolationErrors;
    }

    private ErrorResponseDto(List<FieldError> fieldErrors,
                             List<ConstraintViolationError> constraintViolationErrors) {
        this.fieldErrors = fieldErrors;
        this.constraintViolationErrors = constraintViolationErrors;
    }


    public static ErrorResponseDto of(BindingResult bindingResult,
                                      MessageSource messageSource,
                                      Locale locale) {
        return new ErrorResponseDto(FieldError.of(bindingResult, messageSource, locale), null);
    }

    public static ErrorResponseDto of(Set<ConstraintViolation<?>> constraintViolations) {
        return new ErrorResponseDto(null, ConstraintViolationError.of(constraintViolations));
    }

    public static ErrorResponseDto of(ExceptionCode exceptionCode,
                                      BindingResult bindingResult,
                                      MessageSource messageSource,
                                      Locale locale) {
        return new ErrorResponseDto(exceptionCode.getStatus(),
                                    exceptionCode.getMessage(),
                                    FieldError.of(bindingResult, messageSource, locale),
                                    null);
    }

    public static ErrorResponseDto of(ExceptionCode exceptionCode,
                                      Set<ConstraintViolation<?>> constraintViolations) {
        return new ErrorResponseDto(exceptionCode.getStatus(),
                                    exceptionCode.getMessage(),
                                    null,
                                    ConstraintViolationError.of(constraintViolations));
    }

    public static ErrorResponseDto of(ExceptionCode exceptionCode) {
        return new ErrorResponseDto(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

    public static ErrorResponseDto of(HttpStatus httpStatus) {
        return new ErrorResponseDto(httpStatus.value(), httpStatus.getReasonPhrase());
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class FieldError {
        private String field;
        private String code;
        private Object rejectedValue;
        private String reason;

        private static List<FieldError> of(BindingResult bindingResult,
                                           MessageSource messageSource,
                                           Locale locale) {
            final List<org.springframework.validation.FieldError> fieldErrors
                = bindingResult.getFieldErrors();

            return fieldErrors.stream()
                .map(fieldError -> new FieldError(
                    fieldError.getField(),
                    fieldError.getCode(),
                    fieldError.getRejectedValue() == null ?
                        "" : fieldError.getRejectedValue().toString(),
                    messageSource.getMessage(fieldError, locale))
                )
                .collect(Collectors.toList());
        }
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        private static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations) {
            return constraintViolations.stream()
                .map(constraintViolation -> new ConstraintViolationError(
                    constraintViolation.getPropertyPath().toString(),
                    constraintViolation.getInvalidValue(),
                    constraintViolation.getMessage())
                )
                .collect(Collectors.toList());
        }
    }
}
