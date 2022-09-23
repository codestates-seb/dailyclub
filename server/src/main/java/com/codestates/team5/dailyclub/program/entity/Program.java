package com.codestates.team5.dailyclub.program.entity;

import com.codestates.team5.dailyclub.apply.entity.Apply;
import com.codestates.team5.dailyclub.common.audit.Auditable;
import com.codestates.team5.dailyclub.common.enumeration.CommonEnum;
import com.codestates.team5.dailyclub.image.entity.ProgramImage;
import com.codestates.team5.dailyclub.program.util.LocationConverter;
import com.codestates.team5.dailyclub.program.util.ProgramStatusConverter;
import com.codestates.team5.dailyclub.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Program extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    private String title;

    @NotNull
    private String text;

    @NotNull
    private Integer numOfRecruits;

    @Convert(converter = LocationConverter.class)
    private Location location;

    @NotNull
    private LocalDate programDate;

    @NotNull
    private Integer minKind;


    @Builder.Default //@Builder 사용 시 초기값 설정
    @Convert(converter = ProgramStatusConverter.class)
    private ProgramStatus programStatus = ProgramStatus.POSSIBLE;

    @Builder.Default
    @OneToMany(mappedBy = "program")
    private List<ProgramImage> programImages = new ArrayList<>();


    @Getter
    @AllArgsConstructor
    public enum ProgramStatus implements CommonEnum {
        POSSIBLE("모집중"),
        IMMINENT("마감임박"),
        IMPOSSIBLE("마감");

        private final String description;
    }

    @Getter
    @AllArgsConstructor
    public enum Location implements CommonEnum {
        SEOUL("서울"),
        GYEONGGI("경기"),
        GANGWON("강원"),
        INCHEON("인천"),
        DAEJEON_CHUNGCHEONG("대전/충청"),
        DAEGU_GYEONGBUK("대구/경북"),
        BUSAN_ULSAN_GYEONGNAM("부산/울산/경남"),
        GWANGJU_JEOLLA("광주/전라"),
        JEJU("제주");

        private final String description;
    }

    public void setUser(User user) {
        this.user = user;

    }

}

