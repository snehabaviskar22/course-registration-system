package com.project.course_registration.service;

import com.project.course_registration.dto.RegisterStudentRequest;
import com.project.course_registration.dto.StudentDashboardDTO;
import com.project.course_registration.entity.Department;
import com.project.course_registration.entity.Student;
import com.project.course_registration.enums.EnrollmentStatus;
import com.project.course_registration.enums.StudentStatus;
import com.project.course_registration.repository.DepartmentRepository;
import com.project.course_registration.repository.EnrollmentRepository;
import com.project.course_registration.repository.StudentRepository;
import com.project.course_registration.dto.StudentProfileDTO;
import com.project.course_registration.dto.ChangePasswordRequest;
import com.project.course_registration.dto.AdminStudentDTO;
import com.project.course_registration.dto.LoginRequest;
import com.project.course_registration.dto.LoginResponse;
import com.project.course_registration.enums.UserRole;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Student getStudentById(Integer id) {

        return studentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));
    }

    // Register new student
    public Student registerStudent(RegisterStudentRequest request) {

        if (studentRepository.existsByStudentId(request.getStudentId())) {
            throw new RuntimeException("Student ID already exists");
        }

        if (studentRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new RuntimeException("Department not found"));

        Student student = new Student();

        student.setStudentId(request.getStudentId());
        student.setName(request.getName());
        student.setEmail(request.getEmail());

        // BCrypt Password
        student.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        student.setDepartment(department);
        student.setYear(request.getYear());
        student.setAvatar(request.getAvatar());
        student.setStatus(StudentStatus.Active);
        student.setJoinedDate(LocalDate.now());

        return studentRepository.save(student);
    }

    public LoginResponse login(LoginRequest request) {

    Student student = studentRepository.findByEmail(request.getEmail())
            .orElse(null);

    if (student == null) {

        return new LoginResponse(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                "Invalid email or password",
                false
        );
    }

    if (!passwordEncoder.matches(
            request.getPassword(),
            student.getPassword())) {

        return new LoginResponse(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                "Invalid email or password",
                false
        );
    }

    return new LoginResponse(
            student.getId(),
            student.getStudentId(),
            student.getName(),
            student.getEmail(),
            student.getDepartment().getName(),
            student.getYear(),
            student.getAvatar(),
            UserRole.STUDENT,
            "Login Successful",
            true
    );
}

    // Student Dashboard
    public StudentDashboardDTO getStudentDashboard(Integer studentId) {

        Student student = getStudentById(studentId);

        Integer enrolledCount = (int) enrollmentRepository.countByStudentAndStatus(
                student,
                EnrollmentStatus.ENROLLED
        );

        Integer waitlistCount = (int) enrollmentRepository.countByStudentAndStatus(
                student,
                EnrollmentStatus.WAITLISTED
        );

        StudentDashboardDTO dashboard = new StudentDashboardDTO();

        dashboard.setId(student.getId());
        dashboard.setStudentId(student.getStudentId());
        dashboard.setName(student.getName());
        dashboard.setEmail(student.getEmail());
        dashboard.setDepartment(student.getDepartment().getName());
        dashboard.setYear(student.getYear());
        dashboard.setAvatar(student.getAvatar());
        dashboard.setStatus(student.getStatus().name());
        dashboard.setEnrolledCount(enrolledCount);
        dashboard.setWaitlistCount(waitlistCount);

        return dashboard;
    }

    // Student Profile
    public StudentProfileDTO getStudentProfile(Integer studentId) {

    Student student = getStudentById(studentId);

    StudentProfileDTO profile = new StudentProfileDTO();

    profile.setId(student.getId());
    profile.setStudentId(student.getStudentId());
    profile.setName(student.getName());
    profile.setEmail(student.getEmail());
    profile.setDepartment(student.getDepartment().getName());
    profile.setYear(student.getYear());
    profile.setAvatar(student.getAvatar());

    return profile;
    }
    //change password
    public String changePassword(ChangePasswordRequest request) {

    Student student = studentRepository.findById(request.getStudentId())
            .orElseThrow(() ->
                    new RuntimeException("Student not found"));

    // Check if new password and confirm password match
    if (!request.getNewPassword().equals(request.getConfirmPassword())) {
        return "New passwords do not match";
    }

    // Check if new password is same as current password
    if (request.getCurrentPassword().equals(request.getNewPassword())) {
        return "New password must be different from current password";
    }

    // Verify current password
    if (!passwordEncoder.matches(
            request.getCurrentPassword(),
            student.getPassword())) {

        return "Current password is incorrect";
    }

    // Update password
    student.setPassword(
            passwordEncoder.encode(request.getNewPassword())
    );

    studentRepository.save(student);

    return "Password changed successfully";
}

    // Update student
    public Student updateStudent(Integer id, Student updatedStudent) {

    Student student = getStudentById(id);

    student.setName(updatedStudent.getName());
    student.setEmail(updatedStudent.getEmail());

    Department department =
            departmentRepository.findByName(updatedStudent.getDepartment().getName());

    student.setDepartment(department);

    student.setYear(updatedStudent.getYear());

    return studentRepository.save(student);
}

    // Delete student
    public void deleteStudent(Integer id) {

        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found");
        }

        studentRepository.deleteById(id);
    }

    // ================= ADMIN - VIEW ALL STUDENTS =================

public List<AdminStudentDTO> getAllStudentsForAdmin() {

    List<Student> students = studentRepository.findAll();

    List<AdminStudentDTO> studentDTOList = new ArrayList<>();

    for (Student student : students) {

        Integer enrolledCount = (int) enrollmentRepository
                .countByStudentAndStatus(
                        student,
                        EnrollmentStatus.ENROLLED
                );

        AdminStudentDTO dto = new AdminStudentDTO();

        dto.setId(student.getId());
        dto.setStudentId(student.getStudentId());
        dto.setName(student.getName());
        dto.setEmail(student.getEmail());
        dto.setDepartment(student.getDepartment().getName());
        dto.setYear(student.getYear());
        dto.setAvatar(student.getAvatar());
        dto.setStatus(student.getStatus().name());
        dto.setEnrolledCount(enrolledCount);

        studentDTOList.add(dto);
    }

    return studentDTOList;
}


// ================= ADMIN - VIEW ONE STUDENT =================

public AdminStudentDTO getStudentForAdmin(Integer id) {

    Student student = getStudentById(id);

    Integer enrolledCount = (int) enrollmentRepository
            .countByStudentAndStatus(
                    student,
                    EnrollmentStatus.ENROLLED
            );

    AdminStudentDTO dto = new AdminStudentDTO();

    dto.setId(student.getId());
    dto.setStudentId(student.getStudentId());
    dto.setName(student.getName());
    dto.setEmail(student.getEmail());
    dto.setDepartment(student.getDepartment().getName());
    dto.setYear(student.getYear());
    dto.setAvatar(student.getAvatar());
    dto.setStatus(student.getStatus().name());
    dto.setEnrolledCount(enrolledCount);

    return dto;
}


// ================= ADMIN - DEACTIVATE STUDENT =================

public String deactivateStudent(Integer id) {

    Student student = getStudentById(id);

    if (student.getStatus() == StudentStatus.Inactive) {
        return "Student is already inactive";
    }

    student.setStatus(StudentStatus.Inactive);

    studentRepository.save(student);

    return "Student deactivated successfully";
}


// ================= ADMIN - ACTIVATE STUDENT =================

public String activateStudent(Integer id) {

    Student student = getStudentById(id);

    if (student.getStatus() == StudentStatus.Active) {
        return "Student is already Active";
    }

    student.setStatus(StudentStatus.Active);

    studentRepository.save(student);

    return "Student Activated successfully";
}
}