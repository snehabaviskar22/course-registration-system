package com.project.course_registration.repository;

import com.project.course_registration.entity.Activity;
import com.project.course_registration.enums.ActivityType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {

    List<Activity> findByType(ActivityType type);

    List<Activity> findAllByOrderByActivityTimeDesc();

}