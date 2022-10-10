package com.codestates.team5.dailyclub.throwable.advice;

import com.codestates.team5.dailyclub.throwable.dto.ErrorResponseDto;
import com.codestates.team5.dailyclub.throwable.entity.BusinessLogicException;
import com.codestates.team5.dailyclub.throwable.entity.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import javax.validation.ConstraintViolationException;
import java.util.Locale;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionAdvice {

    private final MessageSource messageSource;

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleMethodArgumentNotValidException(MethodArgumentNotValidException e, Locale locale) {
        log.info("MethodArgumentNotValidException = {}", e.getBindingResult());
        return ErrorResponseDto.of(ExceptionCode.INVALID_INPUT_VALUE, e.getBindingResult(), messageSource, locale);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleBindException(BindException e, Locale locale) {
        log.info("BindException = {}", e.getBindingResult());
        return ErrorResponseDto.of(ExceptionCode.INVALID_INPUT_VALUE, e.getBindingResult(), messageSource, locale);
    }

    @ExceptionHandler
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleConstraintViolationException(ConstraintViolationException e) {
        log.error("ConstraintViolationException", e);
        log.info("ConstraintViolations : {}", e.getConstraintViolations());
        return ErrorResponseDto.of(ExceptionCode.INVALID_INPUT_VALUE, e.getConstraintViolations());
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponseDto> handleBusinessLogicException(BusinessLogicException e) {
        log.info("BusinessLogicException = {}", e.getExceptionCode());
        ErrorResponseDto errorResponseDto = ErrorResponseDto.of(e.getExceptionCode());
        return new ResponseEntity<>(errorResponseDto, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e) {
        log.info("MaxUploadSizeExceededException = {}0", e.getMessage());
        return ErrorResponseDto.of(ExceptionCode.EXCEEDED_MAX_UPLOAD_SIZE);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponseDto handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        log.info("HttpRequestMethodNotSupportedException = {}", e.getMessage());
        return ErrorResponseDto.of(HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        log.info("MethodArgumentTypeMismatchException = {}", e.getMessage());
        return ErrorResponseDto.of(ExceptionCode.INVALID_INPUT_VALUE);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseDto handleException(Exception e) {
        log.error("## handle exception", e);

        //에러 알림 기능 추가

        return ErrorResponseDto.of(HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
