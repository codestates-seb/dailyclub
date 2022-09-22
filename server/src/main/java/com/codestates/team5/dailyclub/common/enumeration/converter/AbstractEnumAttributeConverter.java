package com.codestates.team5.dailyclub.common.enumeration.converter;

import com.codestates.team5.dailyclub.common.enumeration.CommonEnum;
import com.codestates.team5.dailyclub.common.util.EnumValueConvertUtils;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.AttributeConverter;

@Slf4j
@Getter
public class AbstractEnumAttributeConverter<E extends Enum<E> & CommonEnum> implements AttributeConverter<E, String> {

    private Class<E> targetEnumClass;

    @Override
    public String convertToDatabaseColumn(E attribute) {
        targetEnumClass = attribute.getDeclaringClass();
        return EnumValueConvertUtils.toDescription(attribute);
    }

    @Override
    public E convertToEntityAttribute(String dbData) {
        return EnumValueConvertUtils.ofDescription(targetEnumClass, dbData);
    }
}
