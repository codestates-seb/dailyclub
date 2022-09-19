package com.codestates.team5.dailyclub.user.service;

import com.codestates.team5.dailyclub.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    public User createUser (User user) {
        return null;
    }

    public User updateUser (User user, long id) {
        return null;
    }

    public User findUser(long id) {
        return null;
    }

    public Page<User> findUsers(int page, int size) {
        return null;
    }

    public void deleteUser (long id) {

    }
}
