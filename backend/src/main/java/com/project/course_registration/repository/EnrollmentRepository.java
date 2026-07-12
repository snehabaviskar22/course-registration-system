package com.project.course_registration.repository;

import com.project.course_registration.entity.Course;
import com.project.course_registration.entity.Enrollment;
import com.project.course_registration.entity.Student;
import com.project.course_registration.enums.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    boolean existsByStudentAndCourse(
            Student student,
            Course course
    );

    List<Enrollment> findByStudent(
            Student student
    );

    List<Enrollment> findByCourse(
            Course course
    );

    long countByCourseAndStatus(
            Course course,
            EnrollmentStatus status
    );

    long countByStudentAndStatus(
            Student student,
            EnrollmentStatus status
    );

    List<Enrollment> findByCourseAndStatusOrderByEnrollmentDateAsc(
            Course course,
            EnrollmentStatus status
    );

    List<Enrollment> findByStudentAndStatus(
            Student student,
            EnrollmentStatus status
    );

    // Count all enrollments by status (used in Admin Dashboard)
    long countByStatus(
            EnrollmentStatus status
    );

}