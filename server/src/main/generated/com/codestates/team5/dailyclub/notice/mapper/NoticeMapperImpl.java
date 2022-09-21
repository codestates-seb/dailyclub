package com.codestates.team5.dailyclub.notice.mapper;

import com.codestates.team5.dailyclub.notice.dto.NoticeDto;
import com.codestates.team5.dailyclub.notice.entity.Notice;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-09-21T13:35:07+0900",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class NoticeMapperImpl implements NoticeMapper {

    @Override
    public Notice noticePostToNotice(NoticeDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Notice.NoticeBuilder notice = Notice.builder();

        notice.title( requestBody.getTitle() );
        notice.text( requestBody.getText() );

        return notice.build();
    }

    @Override
    public Notice noticePatchToNotice(NoticeDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Notice.NoticeBuilder notice = Notice.builder();

        notice.id( requestBody.getId() );
        notice.title( requestBody.getTitle() );
        notice.text( requestBody.getText() );

        return notice.build();
    }

    @Override
    public Notice noticeToNoticeResponseDto(Notice notice) {
        if ( notice == null ) {
            return null;
        }

        Notice.NoticeBuilder notice1 = Notice.builder();

        notice1.id( notice.getId() );
        notice1.user( notice.getUser() );
        notice1.title( notice.getTitle() );
        notice1.text( notice.getText() );

        return notice1.build();
    }

    @Override
    public List<NoticeDto.Response> NoticesToNoticeResponseDtos(List<Notice> notices) {
        if ( notices == null ) {
            return null;
        }

        List<NoticeDto.Response> list = new ArrayList<NoticeDto.Response>( notices.size() );
        for ( Notice notice : notices ) {
            list.add( noticeToResponse( notice ) );
        }

        return list;
    }

    protected NoticeDto.Response noticeToResponse(Notice notice) {
        if ( notice == null ) {
            return null;
        }

        NoticeDto.Response.ResponseBuilder response = NoticeDto.Response.builder();

        response.id( notice.getId() );
        response.title( notice.getTitle() );
        response.text( notice.getText() );
        response.createdDate( notice.getCreatedDate() );

        return response.build();
    }
}
