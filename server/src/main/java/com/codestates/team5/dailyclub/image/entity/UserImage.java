package com.codestates.team5.dailyclub.image.entity;

import com.codestates.team5.dailyclub.image.dto.UserImageDto;
import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.validator.annotation.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Long size;

    @Image
    private String contentType;

    private String originalName;
    @Lob
    private byte[] bytes;

    public void setUser(User user) {
        if (this.user != null) {
            this.user.getUserImages().remove(this);
        }
        this.user = user;

        user.getUserImages().add(this);
    }

    public void updateUserImage(UserImage userImage) {
        this.size = userImage.getSize();
        this.contentType = userImage.getContentType();
        this.originalName = userImage.getOriginalName();
        this.bytes = userImage.getBytes();

    }

}
