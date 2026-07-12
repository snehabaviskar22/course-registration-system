package com.project.course_registration.controller;

import com.project.course_registration.dto.MyCourseDTO;
import com.project.course_registration.dto.RegisterCourseRequest;
import com.project.course_registration.entity.Enrollment;
import com.project.course_registration.service.EnrollmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
@CrossOrigin(origins = "http://localhost:5173")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    // Register for a course
    @PostMapping("/register")
    public String registerCourse(
            @RequestBody RegisterCourseRequest request) {

        return enrollmentService.registerCourse(request);
    }

    // Get My Courses
    @GetMapping("/student/{studentId}")
    public List<MyCourseDTO> getStudentCourses(
            @PathVariable Integer studentId) {

        return enrollmentService.getStudentCourses(studentId);
    }

    // Get all enrollments
    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    // Get enrollment by ID
    @GetMapping("/{id}")
    public Enrollment getEnrollmentById(
            @PathVariable Integer id) {

        return enrollmentService.getEnrollmentById(id);
    }

    // Delete enrollment
    @DeleteMapping("/{id}")
    public String deleteEnrollment(
            @PathVariable Integer id) {

        return enrollmentService.deleteEnrollment(id);
    }
}