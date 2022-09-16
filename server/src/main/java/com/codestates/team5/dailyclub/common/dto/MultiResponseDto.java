package com.codestates.team5.dailyclub.common.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Schema(title = "응답 데이터 리스트와 페이지 정보")
@Getter
public class MultiResponseDto<T> {
    @Schema(title = "응답 데이터 리스트")
    private List<T> data;
    @Schema(title = "페이지 정보")
    private PageInfo pageInfo;

    public MultiResponseDto(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() +1, page.getSize(), page.getTotalElements(), page.getTotalPages());
    }

    public MultiResponseDto(List<T> data) {
        this.data = data;
    }
}
