package com.codestates.team5.dailyclub.image.entity;

import com.codestates.team5.dailyclub.program.entity.Program;
import com.codestates.team5.dailyclub.validator.annotation.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgramImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "program_id")
    private Program program;

    private Long size;

    @Image
    private String contentType;

    private String originalName;

    @Lob
    private byte[] bytes;

    //양방향 연관관계 편의 메소드
    public void setProgram(Program program) {
        //기존 관계 제거
        if (this.program != null) {
            this.program.getProgramImages().remove(this);
        }

        this.program = program;
        program.getProgramImages().add(this);
    }

    //비즈니스 메소드
    public void updateProgramImage(ProgramImage programImage) {
        this.size = programImage.getSize();
        this.contentType = programImage.getContentType();
        this.originalName = programImage.getOriginalName();
        this.bytes = programImage.getBytes();
    }
}
