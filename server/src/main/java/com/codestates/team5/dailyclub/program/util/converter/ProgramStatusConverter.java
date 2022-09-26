package com.codestates.team5.dailyclub.program.util.converter;

import com.codestates.team5.dailyclub.common.enumeration.converter.AbstractEnumAttributeConverter;
import com.codestates.team5.dailyclub.program.entity.Program;

import javax.persistence.Converter;

@Converter
public class ProgramStatusConverter extends AbstractEnumAttributeConverter<Program.ProgramStatus> {

}
