package com.codestates.team5.dailyclub.location.repository;

import com.codestates.team5.dailyclub.location.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository <Location, Long> {
}
