package com.codestates.team5.dailyclub.user.service;

import com.codestates.team5.dailyclub.user.dto.UserDto;
import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.user.mapper.UserMapper;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


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
    public void updateUser(User user, long id) {
        User findUser = userRepository.findById(id).orElseThrow();
        //쓰기 지연 저장소로 알아서 업데이트 해준다. save로 진행하면 merge가 되는거지 수정되는 것이 아니다
       findUser.update(user.getNickname(), user.getIntroduction(), user.getPicture());

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
    //유저 지웠을 때 전부 다 지워지는 것 programRepository.deleteByUserId
    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }
}

