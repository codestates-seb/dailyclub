package com.codestates.team5.dailyclub.bookmark.repository;

import com.codestates.team5.dailyclub.bookmark.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository <Bookmark, Long> {
}
