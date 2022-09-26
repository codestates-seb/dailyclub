package com.codestates.team5.dailyclub.notice.service;

import com.codestates.team5.dailyclub.notice.entity.Notice;
import com.codestates.team5.dailyclub.notice.repository.NoticeRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository repository;

    public Notice createNotice(Notice notice, long userId) {
        return null;
    }

    public Notice updateNotice(Notice notice, long userId, long noticeId) {
        return null;
    }

    public Notice findNotice(long noticeId) {
        return null;
    }

    public Page<Notice> findNotices(int page, int size) {
        return null;
    }

    public void deleteNotice(long noticeId) {

    }

}
