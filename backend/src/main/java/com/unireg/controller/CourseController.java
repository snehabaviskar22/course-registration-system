package com.unireg.controller;

import com.unireg.dto.CourseDTO;
import com.unireg.dto.CourseRequest;
import com.unireg.dto.EnrollmentDTO;
import com.unireg.dto.MessageResponse;
import com.unireg.dto.RegisterCourseRequest;
import com.unireg.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/courses")
    public ResponseEntity<List<CourseDTO>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/course/{id}")
    public ResponseEntity<CourseDTO> getCourse(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @PostMapping("/course/register")
    public ResponseEntity<MessageResponse> registerCourse(@Valid @RequestBody RegisterCourseRequest req) {
        MessageResponse msg = courseService.registerCourse(req);
        return ResponseEntity.ok(msg);
    }

    @PostMapping("/course/drop")
    public ResponseEntity<MessageResponse> dropCourse(@Valid @RequestBody RegisterCourseRequest req) {
        return ResponseEntity.ok(courseService.dropCourse(req));
    }

    @GetMapping("/student/{id}/courses")
    public ResponseEntity<List<EnrollmentDTO>> getStudentCourses(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getStudentEnrollments(id));
    }

    // ---------- Admin course CRUD (also lives under /api/admin/courses) ----------

    @PostMapping("/admin/courses")
    public ResponseEntity<CourseDTO> createCourse(@Valid @RequestBody CourseRequest req) {
        CourseDTO created = courseService.createCourse(req);
        return ResponseEntity.created(URI.create("/api/course/" + created.getId())).body(created);
    }

    @PutMapping("/admin/courses/{id}")
    public ResponseEntity<CourseDTO> updateCourse(@PathVariable Long id, @Valid @RequestBody CourseRequest req) {
        return ResponseEntity.ok(courseService.updateCourse(id, req));
    }

    @DeleteMapping("/admin/courses/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}
