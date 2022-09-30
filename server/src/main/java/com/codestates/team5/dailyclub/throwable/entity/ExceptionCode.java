package com.codestates.team5.dailyclub.throwable.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */
    INVALID_INPUT_VALUE(400,"입력값이 올바르지 않습니다."),
    CANNOT_UPDATE_OTHERS(400, "본인이 작성한 프로그램에 대해서만 수정할 수 있습니다."),
    CANNOT_APPLY_MINE(400, "본인이 작성한 프로그램을 신청할 수 없습니다."),

    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */



    /* 404 NOT_FOUND : Resource 를 찾을 수 없음 */
    USER_NOT_FOUND(404, "해당 유저를 찾을 수 없습니다."),
    PROGRAM_NOT_FOUND(404, "해당 프로그램을 찾을 수 없습니다."),
    IMAGE_NOT_FOUND(404, "해당 이미지를 찾을 수 없습니다."),


    /* 409 CONFLICT : Resource 의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    FULL_OF_APPLY(409, "모집 인원이 다 찼습니다."),

    ;

    private final int status;
    private final String message;
}
