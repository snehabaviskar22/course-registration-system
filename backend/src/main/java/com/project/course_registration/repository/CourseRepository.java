package com.project.course_registration.repository;

import com.project.course_registration.entity.Course;
import com.project.course_registration.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    Optional<Course> findByCode(String code);

    List<Course> findByDepartment(Department department);

    List<Course> findBySemester(String semester);

    boolean existsByCode(String code);

    // Search courses by name or code (case-insensitive)
    List<Course> findByNameContainingIgnoreCaseOrCodeContainingIgnoreCase(
            String name,
            String code
    );

}