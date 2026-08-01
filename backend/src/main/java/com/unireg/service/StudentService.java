package com.unireg.service;

import com.unireg.dto.DashboardDTO;
import com.unireg.dto.EnrollmentDTO;
import com.unireg.dto.StudentDTO;
import com.unireg.dto.StudentUpdateRequest;
import com.unireg.entity.Enrollment;
import com.unireg.entity.Student;
import com.unireg.exception.ResourceNotFoundException;
import com.unireg.repository.EnrollmentRepository;
import com.unireg.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseService courseService;

    public StudentService(StudentRepository studentRepository,
                          EnrollmentRepository enrollmentRepository,
                          CourseService courseService) {
        this.studentRepository = studentRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.courseService = courseService;
    }

    public StudentDTO toDTO(Student student) {
        long enrolled = enrollmentRepository.countByStudentAndStatus(student, Enrollment.Status.ENROLLED);
        long waitlisted = enrollmentRepository.countByStudentAndStatus(student, Enrollment.Status.WAITLISTED);
        return mapStudent(student, enrolled, waitlisted);
    }

    private StudentDTO mapStudent(Student s, long enrolled, long waitlisted) {
        StudentDTO dto = new StudentDTO();
        dto.setId(String.valueOf(s.getId()));
        dto.setStudentId(s.getStudentId());
        dto.setName(s.getName());
        dto.setEmail(s.getEmail());
        dto.setDepartment(s.getDepartment());
        dto.setYear(s.getYear());
        dto.setAvatar(s.getAvatar());
        dto.setStatus(s.getStatus());
        dto.setJoinedDate(s.getJoinedDate() != null ? s.getJoinedDate().toString() : null);
        dto.setEnrolledCount(enrolled);
        dto.setWaitlistCount(waitlisted);
        return dto;
    }

    @Transactional(readOnly = true)
    public StudentDTO getProfile(Long id) {
        Student student = findStudent(id);
        return toDTO(student);
    }

    @Transactional
    public StudentDTO updateProfile(Long id, StudentUpdateRequest req) {
        Student student = findStudent(id);
        if (req.getName() != null) student.setName(req.getName());
        if (req.getDepartment() != null) student.setDepartment(req.getDepartment());
        if (req.getYear() != null) student.setYear(req.getYear());
        if (req.getAvatar() != null) student.setAvatar(req.getAvatar());
        Student saved = studentRepository.save(student);
        return toDTO(saved);
    }

    @Transactional(readOnly = true)
    public DashboardDTO getDashboard(Long id) {
        Student student = findStudent(id);
        List<Enrollment> enrollments = enrollmentRepository.findByStudent(student);

        long enrolledCount = enrollments.stream().filter(e -> e.getStatus() == Enrollment.Status.ENROLLED).count();
        long waitlistCount = enrollments.stream().filter(e -> e.getStatus() == Enrollment.Status.WAITLISTED).count();
        long registeredCredits = enrollments.stream()
                .filter(e -> e.getStatus() == Enrollment.Status.ENROLLED)
                .mapToInt(e -> e.getCourse().getCredits() != null ? e.getCourse().getCredits() : 0)
                .sum();

        DashboardDTO dashboard = new DashboardDTO();
        dashboard.setEnrolledCount(enrolledCount);
        dashboard.setWaitlistCount(waitlistCount);
        dashboard.setRegisteredCredits(registeredCredits);
        dashboard.setProfile(toDTO(student));
        return dashboard;
    }

    @Transactional(readOnly = true)
    public List<EnrollmentDTO> getStudentCourses(Long id) {
        Student student = findStudent(id);
        return enrollmentRepository.findByStudent(student).stream()
                .map(courseService::toEnrollmentDTO)
                .collect(Collectors.toList());
    }

    // ---------- Admin operations on students ----------

    @Transactional(readOnly = true)
    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public StudentDTO getStudentDetails(Long id) {
        return toDTO(findStudent(id));
    }

    @Transactional
    public StudentDTO updateStudentStatus(Long id, String status) {
        Student student = findStudent(id);
        if (status == null || (!status.equals("Active") && !status.equals("Inactive"))) {
            throw new IllegalArgumentException("Status must be 'Active' or 'Inactive'");
        }
        student.setStatus(status);
        Student saved = studentRepository.save(student);
        return toDTO(saved);
    }

    @Transactional
    public void deleteStudent(Long id) {
        Student student = findStudent(id);
        studentRepository.delete(student);
    }

    private Student findStudent(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id " + id));
    }
}
