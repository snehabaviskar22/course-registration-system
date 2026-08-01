package com.unireg.service;

import com.unireg.entity.Department;
import com.unireg.exception.BadRequestException;
import com.unireg.exception.ConflictException;
import com.unireg.exception.ResourceNotFoundException;
import com.unireg.repository.DepartmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Transactional(readOnly = true)
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Transactional
    public Department createDepartment(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new BadRequestException("Department name is required");
        }
        if (departmentRepository.existsByName(name.trim())) {
            throw new ConflictException("Department already exists: " + name);
        }
        return departmentRepository.save(new Department(name.trim()));
    }

    @Transactional
    public Department updateDepartment(Long id, String name) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id " + id));
        if (name == null || name.trim().isEmpty()) {
            throw new BadRequestException("Department name is required");
        }
        if (!dept.getName().equals(name.trim()) && departmentRepository.existsByName(name.trim())) {
            throw new ConflictException("Department already exists: " + name);
        }
        dept.setName(name.trim());
        return departmentRepository.save(dept);
    }

    @Transactional
    public void deleteDepartment(Long id) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id " + id));
        departmentRepository.delete(dept);
    }
}
