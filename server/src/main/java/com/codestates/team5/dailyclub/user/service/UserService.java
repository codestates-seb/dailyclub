package com.codestates.team5.dailyclub.user.service;

import com.codestates.team5.dailyclub.image.entity.UserImage;
import com.codestates.team5.dailyclub.image.repository.UserImageRepository;
import com.codestates.team5.dailyclub.image.util.ImageUtils;
import com.codestates.team5.dailyclub.throwable.entity.BusinessLogicException;
import com.codestates.team5.dailyclub.throwable.entity.ExceptionCode;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserImageRepository userImageRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

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

    public User updateUser(Long loginUserId, User userFromPatchDto, Long userImageId, MultipartFile imageFile) throws IOException {
        User findUser
                = userRepository.findById(userFromPatchDto.getId())
                .orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        if(!findUser.getId().equals(loginUserId)) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_UPDATE_USERS);
        }

        findUser.update(userFromPatchDto.getNickname(), userFromPatchDto.getIntroduction());

        if(imageFile == null && userImageId == null) {
            return userRepository.save(findUser);
        }else if(imageFile != null && userImageId == null) {
            UserImage userImage = ImageUtils.parseToUserImgae(imageFile);
            userImage.setUser(findUser);
            userImageRepository.save(userImage);
        }else if (imageFile == null && userImageId !=null) {
            userImageRepository.deleteById(userImageId);
        }else if (imageFile != null && userImageId !=null) {
            UserImage findUserImage
                    =userImageRepository.findById(userImageId)
                    .orElseThrow(() ->
                            new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));
            UserImage userImage = ImageUtils.parseToUserImgae(imageFile);
            findUserImage.updateUserImage(userImage);
        }
        return userRepository.save(findUser);

    }

    public User findUser(Long id) {
        return userRepository.findById(id).orElseThrow(
                ()-> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
        );
    }

    public Page<User> findUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size, Sort.by("nickname").descending()));

    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

