package com.codestates.team5.dailyclub.notice.mapper;

import com.codestates.team5.dailyclub.notice.dto.NoticeDto;
import com.codestates.team5.dailyclub.notice.entity.Notice;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NoticeMapper {
    Notice noticePostToNotice (NoticeDto.Post requestBody);
    Notice noticePatchToNotice (NoticeDto.Patch requestBody);
    Notice noticeToNoticeResponseDto (Notice notice);
    List<NoticeDto.Response> NoticesToNoticeResponseDtos(List<Notice> notices);
}
