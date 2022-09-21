package com.codestates.team5.dailyclub.program.util;

import com.codestates.team5.dailyclub.common.enumeration.converter.AbstractEnumAttributeConverter;
import com.codestates.team5.dailyclub.program.entity.Program;

import javax.persistence.Converter;

/**
 * GYEONGGI(Java) <-> "경기"(DB) converter
 */
@Converter
public class LocationConverter extends AbstractEnumAttributeConverter<Program.Location> {

}
