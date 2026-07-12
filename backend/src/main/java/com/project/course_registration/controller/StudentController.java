package com.project.course_registration.controller;

import com.project.course_registration.dto.RegisterStudentRequest;
import com.project.course_registration.dto.StudentDashboardDTO;
import com.project.course_registration.entity.Student;
import com.project.course_registration.service.StudentService;
import com.project.course_registration.dto.StudentProfileDTO;
import com.project.course_registration.dto.ChangePasswordRequest;
import com.project.course_registration.dto.LoginRequest;
import com.project.course_registration.dto.LoginResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Register Student
    @PostMapping("/register")
    public ResponseEntity<Student> registerStudent(
            @RequestBody RegisterStudentRequest request) {

        Student student = studentService.registerStudent(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(student);
    }

    // Student Login
@PostMapping("/login")
public LoginResponse login(
        @RequestBody LoginRequest request) {

    return studentService.login(request);
}

    // Get Student Profile
        @GetMapping("/profile/{id}")
        public ResponseEntity<StudentProfileDTO> getStudentProfile(
        @PathVariable Integer id) {

    StudentProfileDTO profile = studentService.getStudentProfile(id);

    return ResponseEntity.ok(profile);
        }

        // Change Password
    @PutMapping("/change-password")
    public String changePassword(
        @RequestBody ChangePasswordRequest request) {

    return studentService.changePassword(request);
    }

    // Get All Students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {

        return ResponseEntity.ok(
                studentService.getAllStudents()
        );
    }

    // Get Student By ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                studentService.getStudentById(id)
        );
    }

    // Student Dashboard
    @GetMapping("/{id}/dashboard")
    public ResponseEntity<StudentDashboardDTO> getStudentDashboard(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                studentService.getStudentDashboard(id)
        );
    }

    // Update Student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Integer id,
            @RequestBody Student student) {

        return ResponseEntity.ok(
                studentService.updateStudent(id, student)
        );
    }

    // Delete Student
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(
            @PathVariable Integer id) {

        studentService.deleteStudent(id);

        return ResponseEntity.ok(
                "Student deleted successfully"
        );
    }
}