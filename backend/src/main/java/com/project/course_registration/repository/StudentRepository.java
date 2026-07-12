package com.project.course_registration.repository;

import com.project.course_registration.entity.Department;
import com.project.course_registration.entity.Student;
import com.project.course_registration.enums.StudentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Integer> {

    Optional<Student> findByStudentId(String studentId);

    Optional<Student> findByEmail(String email);

    List<Student> findByDepartment(Department department);

    List<Student> findByStatus(StudentStatus status);

    boolean existsByStudentId(String studentId);

    boolean existsByEmail(String email);

}