package com.project.course_registration.service;

import com.project.course_registration.dto.RegisterCourseRequest;
import com.project.course_registration.entity.Course;
import com.project.course_registration.entity.Enrollment;
import com.project.course_registration.entity.Student;
import com.project.course_registration.enums.EnrollmentStatus;
import com.project.course_registration.repository.CourseRepository;
import com.project.course_registration.repository.EnrollmentRepository;
import com.project.course_registration.repository.StudentRepository;

import com.project.course_registration.dto.MyCourseDTO;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    // Get all enrollments
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    // Get enrollment by ID
    public Enrollment getEnrollmentById(Integer id) {

        return enrollmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Enrollment not found"));
    }

    // Register for Course
    public String registerCourse(RegisterCourseRequest request) {

        Student student = studentRepository.findById(request.getStudentId())
        .orElse(null);

if (student == null) {
    return "Student not found";
}

Course course = courseRepository.findById(request.getCourseId())
        .orElse(null);

if (course == null) {
    return "Course not found";
}

if (LocalDate.now().isAfter(course.getRegistrationDeadline())) {
    return "Registration deadline has passed";
}

        // Already registered?
        if (enrollmentRepository.existsByStudentAndCourse(student, course)) {
            return "Student already registered for this course";
        }

        long enrolledCount =
        enrollmentRepository.countByStudentAndStatus(
                student,
                EnrollmentStatus.ENROLLED);

        if (enrolledCount >= 5) {
             return "Maximum course limit reached";
        }

        Enrollment enrollment = new Enrollment();

        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(LocalDateTime.now());

        if (enrolledCount < course.getCapacity()) {

            enrollment.setStatus(EnrollmentStatus.ENROLLED);
            enrollment.setWaitlistPosition(null);

            enrollmentRepository.save(enrollment);

            return "Successfully Enrolled";

        } else {

            long waitlistCount = enrollmentRepository.countByCourseAndStatus(
                    course,
                    EnrollmentStatus.WAITLISTED
            );

            if (waitlistCount >= course.getWaitlistCapacity()) {
                return "Course and Waitlist are Full";
            }

            enrollment.setStatus(EnrollmentStatus.WAITLISTED);
            enrollment.setWaitlistPosition((int) waitlistCount + 1);

            enrollmentRepository.save(enrollment);

            return "Course Full. Added to Waitlist";
        }
    }



    // Get My Courses
public List<MyCourseDTO> getStudentCourses(Integer studentId) {

    Student student = studentRepository.findById(studentId)
            .orElseThrow(() ->
                    new RuntimeException("Student not found"));

    List<Enrollment> enrollments =
            enrollmentRepository.findByStudent(student);

    List<MyCourseDTO> myCourses = new ArrayList<>();

    for (Enrollment enrollment : enrollments) {

        Course course = enrollment.getCourse();

        MyCourseDTO dto = new MyCourseDTO();

        dto.setEnrollmentId(enrollment.getId());
        dto.setCourseId(course.getId());
        dto.setCourseCode(course.getCode());
        dto.setCourseName(course.getName());
        dto.setInstructor(course.getInstructor());
        dto.setCredits(course.getCredits());
        dto.setSemester(course.getSemester());
        dto.setStatus(enrollment.getStatus().name());
        dto.setWaitlistPosition(enrollment.getWaitlistPosition());
        dto.setEnrollmentDate(enrollment.getEnrollmentDate());

        myCourses.add(dto);
    }

    return myCourses;
}


    // Save enrollment
    public Enrollment saveEnrollment(Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    // Delete enrollment
public String deleteEnrollment(Integer id) {

    Enrollment enrollment = enrollmentRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Enrollment not found"));

    Course course = enrollment.getCourse();

    EnrollmentStatus status = enrollment.getStatus();

    // Delete the enrollment
    enrollmentRepository.delete(enrollment);

    // Only promote someone if an ENROLLED student dropped
    if (status == EnrollmentStatus.ENROLLED) {

        List<Enrollment> waitlist = enrollmentRepository
                .findByCourseAndStatusOrderByEnrollmentDateAsc(
                        course,
                        EnrollmentStatus.WAITLISTED
                );

        if (!waitlist.isEmpty()) {

            Enrollment nextStudent = waitlist.get(0);

            nextStudent.setStatus(EnrollmentStatus.ENROLLED);

            nextStudent.setWaitlistPosition(null);

            enrollmentRepository.save(nextStudent);

            // Reorder remaining waitlist positions
            for (int i = 1; i < waitlist.size(); i++) {

                Enrollment waitingStudent = waitlist.get(i);

                waitingStudent.setWaitlistPosition(i);

                enrollmentRepository.save(waitingStudent);
            }
        }
    }
    return "Course dropped successfully";
}

}