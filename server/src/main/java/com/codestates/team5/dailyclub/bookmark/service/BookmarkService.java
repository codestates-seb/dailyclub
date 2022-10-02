package com.codestates.team5.dailyclub.bookmark.service;

import com.codestates.team5.dailyclub.bookmark.entity.Bookmark;
import com.codestates.team5.dailyclub.bookmark.repository.BookmarkRepository;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.program.repository.ProgramRepository;
import com.codestates.team5.dailyclub.throwable.entity.BusinessLogicException;
import com.codestates.team5.dailyclub.throwable.entity.ExceptionCode;
import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final ProgramRepository programRepository;

    public Bookmark createBookmark(Long loginUserId, Long programId) {
        //유저 존재 확인
        User userById = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
        );
        //프로그램 존재 확인
        Program programById = programRepository.findById(programId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.PROGRAM_NOT_FOUND)
        );
        //이미 북마크했는지 확인
        if (bookmarkRepository.existsByUserAndProgram(userById, programById)) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_BOOKMARKED);
        }

        Bookmark bookmark = Bookmark.builder()
                                    .user(userById)
                                    .program(programById)
                                    .build();

        return bookmarkRepository.save(bookmark);
    }

    public Page<Bookmark> findBookmarksByUserId(int page, int size, Long loginUserId) {
        //유저 존재 확인
        User userById = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
        );

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return bookmarkRepository.findAllByUserId(pageRequest, loginUserId);
    }

    public Long findBookmark (Long loginUserId, Long programId) {
        //유저 존재 확인
        User userById = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
        );
        //프로그램 존재 확인
        Program programById = programRepository.findById(programId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.PROGRAM_NOT_FOUND)
        );

        Bookmark bookmark
            = bookmarkRepository.findFirstByUserAndProgram(userById, programById);

        return bookmark == null? null : bookmark.getId();
    }


    public void deleteBookmark(Long loginUserId, Long bookmarkId) {
        //유저 존재 확인
        User userById = userRepository.findById(loginUserId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
        );

        //북마크 여부 확인
        Bookmark bookmarkById = bookmarkRepository.findById(bookmarkId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_FOUND)
        );

        //북마크한 본인이 북마크 삭제하는지 확인
        if (!bookmarkById.getUser().getId().equals(loginUserId)) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_UNBOOKMARK_OTHERS);
        }

        bookmarkRepository.deleteById(bookmarkId);
    }


}
