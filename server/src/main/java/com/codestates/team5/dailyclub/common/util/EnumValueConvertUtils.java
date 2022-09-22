package com.codestates.team5.dailyclub.common.util;

import com.codestates.team5.dailyclub.common.enumeration.CommonEnum;
import org.springframework.util.StringUtils;

import java.util.EnumSet;

public class EnumValueConvertUtils {

    //description에 해당하는 Enum 타입 반환하는 메소드
    public static <T extends Enum<T> & CommonEnum> T ofDescription(Class<T> enumClass,
                                                                   String description) {
        if (!StringUtils.hasText(description)) {
            return null;
        }

        return EnumSet.allOf(enumClass).stream()
                .filter(value -> value.getDescription().equals(description))
                .findAny()
                .orElseThrow(() -> new RuntimeException(String.format("enum=[%s], description=[%s] 존재하지 않습니다.", enumClass.getName(), description)));
    }

    //Enum 타입에서 description으로 변환하는 메소드
    public static <T extends Enum<T> & CommonEnum> String toDescription(T enumValue) {

        if (enumValue == null) {
            return "";
        }

        return enumValue.getDescription();
    }
}
