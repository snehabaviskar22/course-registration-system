package com.unireg.controller;

import com.unireg.dto.DashboardDTO;
import com.unireg.dto.StudentDTO;
import com.unireg.dto.StudentUpdateRequest;
import com.unireg.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student") // Base path for all student-related endpoints
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/profile/{id}") // Endpoint to retrieve a student's profile by ID
    public ResponseEntity<StudentDTO> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getProfile(id));
    }

    @PutMapping("/profile/{id}") // Endpoint to update a student's profile by ID
    public ResponseEntity<StudentDTO> updateProfile(@PathVariable Long id,
                                                     @RequestBody StudentUpdateRequest req) {
        return ResponseEntity.ok(studentService.updateProfile(id, req));
    }

    @GetMapping("/dashboard/{id}") // Endpoint to retrieve a student's dashboard information by ID
    public ResponseEntity<DashboardDTO> getDashboard(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getDashboard(id));
    }
}
