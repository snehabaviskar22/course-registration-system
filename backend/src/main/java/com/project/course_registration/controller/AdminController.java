package com.project.course_registration.controller;

import com.project.course_registration.dto.AdminDashboardDTO;
import com.project.course_registration.dto.AdminLoginRequest;
import com.project.course_registration.dto.AdminLoginResponse;
import com.project.course_registration.dto.AdminStudentDTO;
import com.project.course_registration.service.AdminService;
import com.project.course_registration.service.StudentService;
import com.project.course_registration.entity.Course;
import com.project.course_registration.service.CourseService;
import com.project.course_registration.dto.CourseDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private CourseService courseService;

    // ---------------- ADMIN LOGIN ----------------

    @PostMapping("/login")
    public AdminLoginResponse login(
            @RequestBody AdminLoginRequest request) {

        return adminService.login(request);
    }

    // ---------------- ADMIN DASHBOARD ----------------

    @GetMapping("/dashboard")
    public AdminDashboardDTO getDashboard() {

        return adminService.getDashboard();
    }

    // ---------------- ADMIN - VIEW ALL STUDENTS ----------------

    @GetMapping("/students")
    public List<AdminStudentDTO> getAllStudents() {

        return studentService.getAllStudentsForAdmin();
    }

    // ---------------- ADMIN - VIEW ONE STUDENT ----------------

    @GetMapping("/students/{id}")
    public AdminStudentDTO getStudent(
            @PathVariable Integer id) {

        return studentService.getStudentForAdmin(id);
    }

    // ---------------- ADMIN - DEACTIVATE STUDENT ----------------

    @PutMapping("/students/deactivate/{id}")
    public String deactivateStudent(
            @PathVariable Integer id) {

        return studentService.deactivateStudent(id);
    }

    @PutMapping("/students/activate/{id}")
    public String activateStudent(
        @PathVariable Integer id) {

    return studentService.activateStudent(id);
    }

    // ---------------- ADMIN - VIEW ALL COURSES ----------------

@GetMapping("/courses")
public List<CourseDTO> getAllCourses() {

    return courseService.getAllCourses();
}


// ---------------- ADMIN - VIEW COURSE ----------------

@GetMapping("/courses/{id}")
public Course getCourse(
        @PathVariable Integer id) {

    return courseService.getCourseById(id);
}


// ---------------- ADMIN - ADD COURSE ----------------

@PostMapping("/courses")
public Course addCourse(
        @RequestBody Course course) {

    return courseService.addCourse(course);
}


// ---------------- ADMIN - UPDATE COURSE ----------------

@PutMapping("/courses/{id}")
public Course updateCourse(
        @PathVariable Integer id,
        @RequestBody Course course) {

    return courseService.updateCourse(id, course);
}


// ---------------- ADMIN - DELETE COURSE ----------------

@DeleteMapping("/courses/{id}")
public String deleteCourse(
        @PathVariable Integer id) {

    return courseService.deleteCourse(id);
}

}