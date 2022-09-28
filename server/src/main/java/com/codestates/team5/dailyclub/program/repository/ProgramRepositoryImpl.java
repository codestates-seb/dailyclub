package com.codestates.team5.dailyclub.program.repository;

import com.codestates.team5.dailyclub.common.util.EnumValueConvertUtils;
import com.codestates.team5.dailyclub.program.dto.SearchFilterDto;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;

import static com.codestates.team5.dailyclub.program.entity.QProgram.program;

@RequiredArgsConstructor
public class ProgramRepositoryImpl implements ProgramRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Program> searchAndFilter(Pageable pageable, SearchFilterDto searchFilterDto) {
        //데이터 조회와 totalCount 조회 분리

        //데이터 조회
        List<Program> content = queryFactory
            .selectFrom(program)
            .where(
                keywordContains(searchFilterDto.getKeyword()),
                locationEq(searchFilterDto.getLocation()),
                minKindGoe(searchFilterDto.getMinKind()),
                programDateEq(searchFilterDto.getProgramDate()),
                programStatusEq(searchFilterDto.getProgramStatus())
            )
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();

        //totalCount Query
        JPAQuery<Long> countQuery = queryFactory
            .select(program.count())
            .from(program)
            .where(
                keywordContains(searchFilterDto.getKeyword()),
                locationEq(searchFilterDto.getLocation()),
                minKindGoe(searchFilterDto.getMinKind()),
                programDateEq(searchFilterDto.getProgramDate()),
                programStatusEq(searchFilterDto.getProgramStatus())
            );

        /**
         * total count query 필요없는 경우
         * 1. 첫 페이지, 데이터 수가 사이즈보다 작을 때
         * 2. 마지막 페이지일 때
         * -> PageableExecutionUtils를 사용하면 위 경우일 때 total count query를 실행하지 않는다.
         */
        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    //title이나 text에 keyword 있는지 여부
    private BooleanExpression keywordContains(String keyword) {
        return StringUtils.hasText(keyword) ?
            program.title.contains(keyword).or(program.text.contains(keyword)) : null;
    }
    //같은 지역인지 여부
    private BooleanExpression locationEq(String location) {
        return StringUtils.hasText(location) ?
            program.location.eq(EnumValueConvertUtils.ofDescription(Program.Location.class, location)) : null;
    }
    //더 높은 최소 신청 가능 친절 퍼센트인지
    private BooleanExpression minKindGoe(Integer minKind) {
        return (minKind != null) ?
            program.minKind.goe(minKind) : null;
    }
    //해당 날짜에 프로그램이 시작하는지
    private BooleanExpression programDateEq(LocalDate programDate) {
        return (programDate != null) ?
            program.programDate.eq(programDate) : null;
    }
    //[모집중, 마감임박, 마감] 상태
    private BooleanExpression programStatusEq(String programStatus) {
        return (programStatus != null) ?
            program.programStatus.eq(EnumValueConvertUtils.ofDescription(Program.ProgramStatus.class, programStatus)) : null;
    }

}
