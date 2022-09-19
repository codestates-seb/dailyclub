package com.codestates.team5.dailyclub.bookmark.service;

import com.codestates.team5.dailyclub.bookmark.entity.Bookmark;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookmarkService {
    public Bookmark createBookmark(Long loginUserId, Long questionId) {
        return null;
    }

    public Page<Bookmark> findBookmarks(int page, int size, Long loginUserId) {
        return null;
    }

    public void deleteBookmark(Long id) {

    }
}
