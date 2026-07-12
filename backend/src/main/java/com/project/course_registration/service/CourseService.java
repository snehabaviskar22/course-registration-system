package com.project.course_registration.service;

import com.project.course_registration.dto.CourseDTO;
import com.project.course_registration.entity.Course;
import com.project.course_registration.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.course_registration.entity.Department;
import com.project.course_registration.repository.DepartmentRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
private DepartmentRepository departmentRepository;

    // Get all courses (Home Page)
    public List<CourseDTO> getAllCourses() {

        List<Course> courses = courseRepository.findAll();

        List<CourseDTO> courseDTOList = new ArrayList<>();

        for (Course course : courses) {

            CourseDTO dto = new CourseDTO();

            dto.setId(course.getId());
            dto.setCode(course.getCode());
            dto.setName(course.getName());
            dto.setInstructor(course.getInstructor());
            dto.setDepartment(course.getDepartment().getName());
            dto.setCredits(course.getCredits());
            dto.setCapacity(course.getCapacity());

            // These will be calculated later when we implement Enrollment
            dto.setEnrolled(0);
            dto.setWaitlistCount(0);

            dto.setWaitlistCapacity(course.getWaitlistCapacity());
            dto.setSemester(course.getSemester());
            dto.setRegistrationDeadline(course.getRegistrationDeadline());
            dto.setDescription(course.getDescription());

            // Will be dynamic later
            dto.setStatus("AVAILABLE");

            courseDTOList.add(dto);
        }

        return courseDTOList;
    }

    // Get Course by ID
    public Course getCourseById(Integer id) {

        return courseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Course not found"));
    }

    // Add Course
    public Course addCourse(Course course) {

        if (courseRepository.existsByCode(course.getCode())) {
            throw new RuntimeException("Course code already exists");
        }

        return courseRepository.save(course);
    }

    // Update Course
    public Course updateCourse(Integer id, Course updatedCourse) {

        Course course = getCourseById(id);

        course.setCode(updatedCourse.getCode());
        course.setName(updatedCourse.getName());
        course.setInstructor(updatedCourse.getInstructor());
        course.setDepartment(updatedCourse.getDepartment());
        course.setCredits(updatedCourse.getCredits());
        course.setCapacity(updatedCourse.getCapacity());
        course.setWaitlistCapacity(updatedCourse.getWaitlistCapacity());
        course.setSemester(updatedCourse.getSemester());
        course.setRegistrationDeadline(updatedCourse.getRegistrationDeadline());
        course.setDescription(updatedCourse.getDescription());

        return courseRepository.save(course);
    }

    // Delete Course
public String deleteCourse(Integer id) {

    if (!courseRepository.existsById(id)) {
        return "Course not found";
    }

    courseRepository.deleteById(id);

    return "Course deleted successfully";
}

// Search Courses
public List<CourseDTO> searchCourses(String keyword) {

    List<Course> courses =
            courseRepository.findByNameContainingIgnoreCaseOrCodeContainingIgnoreCase(
                    keyword,
                    keyword
            );

    List<CourseDTO> courseDTOList = new ArrayList<>();

    for (Course course : courses) {

        CourseDTO dto = new CourseDTO();

        dto.setId(course.getId());
        dto.setCode(course.getCode());
        dto.setName(course.getName());
        dto.setInstructor(course.getInstructor());
        dto.setDepartment(course.getDepartment().getName());
        dto.setCredits(course.getCredits());
        dto.setCapacity(course.getCapacity());

        dto.setEnrolled(0);
        dto.setWaitlistCount(0);

        dto.setWaitlistCapacity(course.getWaitlistCapacity());
        dto.setSemester(course.getSemester());
        dto.setRegistrationDeadline(course.getRegistrationDeadline());
        dto.setDescription(course.getDescription());
        dto.setStatus("AVAILABLE");

        courseDTOList.add(dto);
    }

    return courseDTOList;
}

// Filter Courses by Department
public List<CourseDTO> getCoursesByDepartment(Integer departmentId) {

    Department department = departmentRepository.findById(departmentId)
            .orElseThrow(() ->
                    new RuntimeException("Department not found"));

    List<Course> courses =
            courseRepository.findByDepartment(department);

    List<CourseDTO> courseDTOList = new ArrayList<>();

    for (Course course : courses) {

        CourseDTO dto = new CourseDTO();

        dto.setId(course.getId());
        dto.setCode(course.getCode());
        dto.setName(course.getName());
        dto.setInstructor(course.getInstructor());
        dto.setDepartment(course.getDepartment().getName());
        dto.setCredits(course.getCredits());
        dto.setCapacity(course.getCapacity());

        dto.setEnrolled(0);
        dto.setWaitlistCount(0);

        dto.setWaitlistCapacity(course.getWaitlistCapacity());
        dto.setSemester(course.getSemester());
        dto.setRegistrationDeadline(course.getRegistrationDeadline());
        dto.setDescription(course.getDescription());
        dto.setStatus("AVAILABLE");

        courseDTOList.add(dto);
    }

    return courseDTOList;
}
}