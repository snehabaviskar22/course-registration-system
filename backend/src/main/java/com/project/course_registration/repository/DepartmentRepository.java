package com.project.course_registration.repository;

import com.project.course_registration.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

    Optional<Department> findByCode(String code);
     Department findByName(String name);

    boolean existsByCode(String code);

    boolean existsByName(String name);

}