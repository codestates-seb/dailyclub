package com.codestates.team5.dailyclub.image.util;

import com.codestates.team5.dailyclub.image.entity.ProgramImage;
import com.codestates.team5.dailyclub.throwable.entity.BusinessLogicException;
import com.codestates.team5.dailyclub.throwable.entity.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
public class ImageUtils {

    //MultipartFile -> ProgramImage
    public static ProgramImage parseToProgramImage(MultipartFile imageFile) throws IOException {
        String contentType = imageFile.getContentType();

        log.info("contentType : {}", contentType);

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
