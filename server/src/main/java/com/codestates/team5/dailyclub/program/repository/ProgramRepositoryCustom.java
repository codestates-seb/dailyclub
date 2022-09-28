package com.codestates.team5.dailyclub.program.repository;

import com.codestates.team5.dailyclub.program.dto.SearchFilterDto;
import com.codestates.team5.dailyclub.program.entity.Program;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


public interface ProgramRepositoryCustom {

    Page<Program> searchAndFilter(Pageable pageable, SearchFilterDto searchFilterDto);

}
