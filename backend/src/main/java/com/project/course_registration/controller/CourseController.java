package com.project.course_registration.controller;

import com.project.course_registration.dto.CourseDTO;
import com.project.course_registration.entity.Course;
import com.project.course_registration.service.CourseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // Get all courses (Home Page)
    @GetMapping
    public ResponseEntity<List<CourseDTO>> getAllCourses() {

        return ResponseEntity.ok(courseService.getAllCourses());
    }

    // Search courses
    @GetMapping("/search")
    public ResponseEntity<List<CourseDTO>> searchCourses(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                courseService.searchCourses(keyword)
        );
    }

    // Filter courses by department
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<CourseDTO>> getCoursesByDepartment(
            @PathVariable Integer departmentId) {

        return ResponseEntity.ok(
                courseService.getCoursesByDepartment(departmentId)
        );
    }

    // Get course by ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                courseService.getCourseById(id)
        );
    }

    // Add new course
    @PostMapping
    public ResponseEntity<Course> addCourse(
            @RequestBody Course course) {

        Course savedCourse = courseService.addCourse(course);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedCourse);
    }

    // Update course
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(
            @PathVariable Integer id,
            @RequestBody Course course) {

        return ResponseEntity.ok(
                courseService.updateCourse(id, course)
        );
    }

    // Delete course
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(
            @PathVariable Integer id) {

        courseService.deleteCourse(id);

        return ResponseEntity.ok(
                "Course deleted successfully"
        );
    }
}