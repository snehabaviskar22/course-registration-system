package com.unireg.controller;

import com.unireg.dto.DepartmentEnrollmentDTO;
import com.unireg.dto.StatsDTO;
import com.unireg.dto.StudentDTO;
import com.unireg.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/stats")
    public ResponseEntity<StatsDTO> getStats() {
        return ResponseEntity.ok(adminService.getStats());
    }

    @GetMapping("/enrollments-by-department")
    public ResponseEntity<List<DepartmentEnrollmentDTO>> enrollmentsByDepartment() {
        return ResponseEntity.ok(adminService.getEnrollmentsByDepartment());
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        return ResponseEntity.ok(adminService.getAllStudents());
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<StudentDTO> getStudent(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getStudentDetails(id));
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<StudentDTO> updateStudentStatus(@PathVariable Long id,
                                                           @RequestParam String status) {
        return ResponseEntity.ok(adminService.updateStudentStatus(id, status));
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        adminService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
