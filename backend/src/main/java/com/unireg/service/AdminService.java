package com.unireg.service;

import com.unireg.dto.DepartmentEnrollmentDTO;
import com.unireg.dto.StatsDTO;
import com.unireg.dto.StudentDTO;
import com.unireg.entity.Department;
import com.unireg.entity.Enrollment;
import com.unireg.repository.CourseRepository;
import com.unireg.repository.DepartmentRepository;
import com.unireg.repository.EnrollmentRepository;
import com.unireg.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final DepartmentRepository departmentRepository;
    private final StudentService studentService;

    public AdminService(StudentRepository studentRepository,
                        CourseRepository courseRepository,
                        EnrollmentRepository enrollmentRepository,
                        DepartmentRepository departmentRepository,
                        StudentService studentService) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.departmentRepository = departmentRepository;
        this.studentService = studentService;
    }

    @Transactional(readOnly = true)
    public StatsDTO getStats() {
        long totalStudents = studentRepository.count();
        long totalCourses = courseRepository.count();
        long totalEnrollments = enrollmentRepository.countByStatus(Enrollment.Status.ENROLLED);
        long totalWaitlisted = enrollmentRepository.countByStatus(Enrollment.Status.WAITLISTED);
        return new StatsDTO(totalStudents, totalCourses, totalEnrollments, totalWaitlisted);
    }

    @Transactional(readOnly = true)
    public List<DepartmentEnrollmentDTO> getEnrollmentsByDepartment() {
        List<Department> departments = departmentRepository.findAll();
        return departments.stream().map(d -> {
            long enrolled = enrollmentRepository.countEnrolledByDepartment(d.getName());
            long courses = enrollmentRepository.countCoursesByDepartment(d.getName());
            return new DepartmentEnrollmentDTO(d.getName(), enrolled, courses);
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<StudentDTO> getAllStudents() {
        return studentService.getAllStudents();
    }

    @Transactional(readOnly = true)
    public StudentDTO getStudentDetails(Long id) {
        return studentService.getStudentDetails(id);
    }

    @Transactional
    public StudentDTO updateStudentStatus(Long id, String status) {
        return studentService.updateStudentStatus(id, status);
    }

    @Transactional 
    public void deleteStudent(Long id) {
        studentService.deleteStudent(id);
    }
}
