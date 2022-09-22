package com.codestates.team5.dailyclub.user.service;

import com.codestates.team5.dailyclub.user.dto.UserDto;
import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.user.mapper.UserMapper;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public User createUser(UserDto.Post requestBody) {
        User user = User.builder()
                .loginId(requestBody.getLoginId())
                .password(bCryptPasswordEncoder.encode(requestBody.getPassword()))
                .nickname(requestBody.getNickname())
                .email(requestBody.getEmail())
                .kind(50)
                .role(User.Role.USER)
                .build();
        return userRepository.save(user);
    }
    @Transactional
    public User updateUser(User user, long id) {
        User findUser = userRepository.findById(id).orElseThrow();
        findUser.update(user.getNickname(), user.getIntroduction(), user.getPicture());
        return userRepository.save(findUser);

    }
    @Transactional
    public User findUser(long id) {
        return userRepository.findById(id).orElseThrow();
    }
    @Transactional(readOnly = true)
    public Page<User> findUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size, Sort.by("nickname").descending()));

    }
    @Transactional
    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }
}

