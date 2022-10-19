package com.codestates.team5.dailyclub.image.repository;

import com.codestates.team5.dailyclub.image.entity.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserImageRepository extends JpaRepository<UserImage,Long> {
}
