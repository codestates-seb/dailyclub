package com.codestates.team5.dailyclub.image.util;

import com.codestates.team5.dailyclub.image.entity.ProgramImage;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class ImageUtils {

    //MultipartFile -> ProgramImage
    public static ProgramImage parseToProgramImage(MultipartFile imageFile) throws IOException {
        String contentType = imageFile.getContentType();

        if (!contentType.startsWith("image/")) {
            throw new RuntimeException("이미지 파일만 업로드 가능합니다.");
        }

        long size = imageFile.getSize();
        String originalName = imageFile.getOriginalFilename();
        byte[] bytes = imageFile.getBytes();

        return ProgramImage.builder()
            .size(size)
            .contentType(contentType)
            .originalName(originalName)
            .bytes(bytes)
            .build();
    }
}
