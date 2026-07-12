package com.project.course_registration.service;

import com.project.course_registration.dto.AdminDashboardDTO;
import com.project.course_registration.dto.AdminLoginRequest;
import com.project.course_registration.dto.AdminLoginResponse;
import com.project.course_registration.dto.DepartmentEnrollmentDTO;
import com.project.course_registration.entity.Admin;
import com.project.course_registration.entity.Course;
import com.project.course_registration.entity.Department;
import com.project.course_registration.enums.EnrollmentStatus;
import com.project.course_registration.repository.AdminRepository;
import com.project.course_registration.repository.CourseRepository;
import com.project.course_registration.repository.DepartmentRepository;
import com.project.course_registration.repository.EnrollmentRepository;
import com.project.course_registration.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ---------------- ADMIN LOGIN ----------------

    public AdminLoginResponse login(AdminLoginRequest request) {

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (admin == null) {
            return new AdminLoginResponse(
                    null,
                    null,
                    null,
                    null,
                    "Invalid email or password",
                    false
            );
        }

        if (!request.getPassword().equals(admin.getPassword())) {

            return new AdminLoginResponse(
                    null,
                    null,
                    null,
                    null,
                    "Invalid email or password",
                    false
            );
        }

        return new AdminLoginResponse(
                admin.getId(),
                admin.getName(),
                admin.getEmail(),
                "ADMIN",
                "Login Successful",
                true
        );
    }

    // ---------------- ADMIN DASHBOARD ----------------

    public AdminDashboardDTO getDashboard() {

        AdminDashboardDTO dashboard = new AdminDashboardDTO();

        dashboard.setTotalStudents(studentRepository.count());
        dashboard.setTotalCourses(courseRepository.count());
        dashboard.setTotalEnrollments(enrollmentRepository.count());

        dashboard.setTotalWaitlisted(
                enrollmentRepository.countByStatus(
                        EnrollmentStatus.WAITLISTED
                )
        );

        List<DepartmentEnrollmentDTO> departmentStats = new ArrayList<>();

        List<Department> departments = departmentRepository.findAll();

        for (Department department : departments) {

            int enrolledCount = 0;

            List<Course> courses =
                    courseRepository.findByDepartment(department);

            for (Course course : courses) {

                enrolledCount += enrollmentRepository
                        .countByCourseAndStatus(
                                course,
                                EnrollmentStatus.ENROLLED
                        );
            }

            departmentStats.add(
                    new DepartmentEnrollmentDTO(
                            department.getName(),
                            enrolledCount
                    )
            );
        }

        dashboard.setDepartmentEnrollments(departmentStats);

        return dashboard;
    }
}