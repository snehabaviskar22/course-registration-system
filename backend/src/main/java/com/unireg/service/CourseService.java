package com.unireg.service;

import com.unireg.dto.CourseDTO;
import com.unireg.dto.CourseRequest;
import com.unireg.dto.EnrollmentDTO;
import com.unireg.dto.MessageResponse;
import com.unireg.dto.RegisterCourseRequest;
import com.unireg.entity.Course;
import com.unireg.entity.Enrollment;
import com.unireg.entity.Student;
import com.unireg.exception.BadRequestException;
import com.unireg.exception.ConflictException;
import com.unireg.exception.ResourceNotFoundException;
import com.unireg.repository.CourseRepository;
import com.unireg.repository.EnrollmentRepository;
import com.unireg.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;

    private static final DateTimeFormatter ISO = DateTimeFormatter.ISO_LOCAL_DATE;

    public CourseService(CourseRepository courseRepository,
                         EnrollmentRepository enrollmentRepository,
                         StudentRepository studentRepository) {
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
    }

    // ---------- DTO mapping ----------

    public CourseDTO toDTO(Course course) {
        long enrolled = enrollmentRepository.countByCourseAndStatus(course, Enrollment.Status.ENROLLED);
        long waitlisted = enrollmentRepository.countByCourseAndStatus(course, Enrollment.Status.WAITLISTED);
        return mapCourse(course, enrolled, waitlisted);
    }

    private CourseDTO mapCourse(Course course, long enrolled, long waitlisted) {
        CourseDTO dto = new CourseDTO();
        dto.setId(String.valueOf(course.getId()));
        dto.setCode(course.getCode());
        dto.setName(course.getName());
        dto.setInstructor(course.getInstructor());
        dto.setDepartment(course.getDepartment());
        dto.setCredits(course.getCredits());
        dto.setCapacity(course.getCapacity());
        dto.setEnrolled(enrolled);
        dto.setWaitlistCapacity(course.getWaitlistCapacity());
        dto.setWaitlistCount(waitlisted);
        dto.setSemester(course.getSemester());
        dto.setDeadline(course.getRegistrationDeadline() != null ? course.getRegistrationDeadline().toString() : null);
        dto.setDescription(course.getDescription());
        dto.setColor(course.getColor());
        dto.setIcon(course.getIcon());
        return dto;
    }

    public EnrollmentDTO toEnrollmentDTO(Enrollment e) {
        Course course = e.getCourse();
        long enrolled = enrollmentRepository.countByCourseAndStatus(course, Enrollment.Status.ENROLLED);
        long waitlisted = enrollmentRepository.countByCourseAndStatus(course, Enrollment.Status.WAITLISTED);

        EnrollmentDTO dto = new EnrollmentDTO();
        dto.setId(String.valueOf(e.getId()));
        dto.setCourseId(String.valueOf(course.getId()));
        dto.setCode(course.getCode());
        dto.setName(course.getName());
        dto.setInstructor(course.getInstructor());
        dto.setDepartment(course.getDepartment());
        dto.setCredits(course.getCredits());
        dto.setCapacity(course.getCapacity());
        dto.setEnrolled(enrolled);
        dto.setWaitlistCapacity(course.getWaitlistCapacity());
        dto.setWaitlistCount(waitlisted);
        dto.setSemester(course.getSemester());
        dto.setDeadline(course.getRegistrationDeadline() != null ? course.getRegistrationDeadline().toString() : null);
        dto.setDescription(course.getDescription());
        dto.setColor(course.getColor());
        dto.setIcon(course.getIcon());
        dto.setStatus(e.getStatus().name());
        dto.setEnrollmentDate(e.getEnrollmentDate() != null ? e.getEnrollmentDate().toString() : null);
        dto.setWaitlistPosition(e.getWaitlistPosition());
        dto.setWaitlistTotal(e.getStatus() == Enrollment.Status.WAITLISTED ? (int) waitlisted : null);
        return dto;
    }

    // ---------- Public read ----------

    @Transactional(readOnly = true)
    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CourseDTO getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + id));
        return toDTO(course);
    }

    // ---------- Student enrollments ----------

    @Transactional(readOnly = true)
    public List<EnrollmentDTO> getStudentEnrollments(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id " + studentId));
        return enrollmentRepository.findByStudent(student).stream()
                .map(this::toEnrollmentDTO)
                .collect(Collectors.toList());
    }

    // ---------- Register (enroll / waitlist) ----------

    @Transactional
    public MessageResponse registerCourse(RegisterCourseRequest req) {
        Student student = studentRepository.findById(req.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id " + req.getStudentId()));
        Course course = courseRepository.findById(req.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + req.getCourseId()));

        // Prevent duplicate enrollment / waitlist entries
        Optional<Enrollment> existing = enrollmentRepository.findByStudentAndCourse(student, course);
        if (existing.isPresent()) {
            if (existing.get().getStatus() == Enrollment.Status.ENROLLED) {
                throw new ConflictException("You are already enrolled in this course");
            } else {
                throw new ConflictException("You are already on the waitlist for this course");
            }
        }

        // Prevent registration after deadline
        if (course.getRegistrationDeadline() != null
                && LocalDate.now().isAfter(course.getRegistrationDeadline())) {
            throw new BadRequestException("Registration deadline has passed for this course");
        }

        long enrolledCount = enrollmentRepository.countByCourseAndStatus(course, Enrollment.Status.ENROLLED);
        long waitlistedCount = enrollmentRepository.countByCourseAndStatus(course, Enrollment.Status.WAITLISTED);

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(LocalDate.now());

        if (enrolledCount < course.getCapacity()) {
            // Seat available -> enroll
            enrollment.setStatus(Enrollment.Status.ENROLLED);
            enrollment.setWaitlistPosition(null);
            enrollmentRepository.save(enrollment);
            return new MessageResponse("Successfully enrolled in " + course.getName());
        } else {
            // Course full -> add to waitlist if space
            if (waitlistedCount >= course.getWaitlistCapacity()) {
                throw new ConflictException("Course is full and the waitlist is also full");
            }
            int position = (int) waitlistedCount + 1;
            enrollment.setStatus(Enrollment.Status.WAITLISTED);
            enrollment.setWaitlistPosition(position);
            enrollmentRepository.save(enrollment);
            return new MessageResponse("Added to waitlist for " + course.getName() + " at position " + position);
        }
    }

    // ---------- Drop (with auto-promote + reindex) ----------

    @Transactional
    public MessageResponse dropCourse(RegisterCourseRequest req) {
        Student student = studentRepository.findById(req.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id " + req.getStudentId()));
        Course course = courseRepository.findById(req.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + req.getCourseId()));

        Enrollment enrollment = enrollmentRepository.findByStudentAndCourse(student, course)
                .orElseThrow(() -> new BadRequestException("You are not enrolled in this course"));

        Enrollment.Status droppedStatus = enrollment.getStatus();
        enrollmentRepository.delete(enrollment);
        enrollmentRepository.flush();

        if (droppedStatus == Enrollment.Status.ENROLLED) {
            // Promote the first waitlisted student (lowest position) into the seat
            List<Enrollment> waitlist = enrollmentRepository.findWaitlistByCourse(course, Enrollment.Status.WAITLISTED);
            if (!waitlist.isEmpty()) {
                Enrollment promoted = waitlist.get(0);
                promoted.setStatus(Enrollment.Status.ENROLLED);
                promoted.setWaitlistPosition(null);
                enrollmentRepository.save(promoted);
                // Reindex remaining waitlisted positions
                reindexWaitlist(course);
            }
        } else {
            // Dropped from waitlist -> just reindex remaining positions
            reindexWaitlist(course);
        }

        return new MessageResponse("Dropped " + course.getName());
    }

    private void reindexWaitlist(Course course) {
        List<Enrollment> waitlist = enrollmentRepository.findWaitlistByCourse(course, Enrollment.Status.WAITLISTED);
        int pos = 1;
        for (Enrollment e : waitlist) {
            e.setWaitlistPosition(pos++);
            enrollmentRepository.save(e);
        }
    }

    // ---------- Admin CRUD ----------

    @Transactional
    public CourseDTO createCourse(CourseRequest req) {
        if (courseRepository.existsByCode(req.getCode())) {
            throw new ConflictException("Course code already exists: " + req.getCode());
        }
        Course course = new Course();
        applyRequest(course, req);
        Course saved = courseRepository.save(course);
        return toDTO(saved);
    }

    @Transactional
    public CourseDTO updateCourse(Long id, CourseRequest req) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + id));
        if (!course.getCode().equals(req.getCode()) && courseRepository.existsByCode(req.getCode())) {
            throw new ConflictException("Course code already exists: " + req.getCode());
        }
        applyRequest(course, req);
        Course saved = courseRepository.save(course);
        return toDTO(saved);
    }

    @Transactional
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + id));
        courseRepository.delete(course);
    }

    private void applyRequest(Course course, CourseRequest req) {
        course.setCode(req.getCode());
        course.setName(req.getName());
        course.setInstructor(req.getInstructor());
        course.setDepartment(req.getDepartment());
        course.setCredits(req.getCredits());
        course.setCapacity(req.getCapacity());
        course.setWaitlistCapacity(req.getWaitlistCapacity());
        course.setSemester(req.getSemester());
        if (req.getRegistrationDeadline() != null && !req.getRegistrationDeadline().isBlank()) {
            course.setRegistrationDeadline(LocalDate.parse(req.getRegistrationDeadline(), ISO));
        }
        course.setDescription(req.getDescription());
        course.setColor(req.getColor());
        course.setIcon(req.getIcon());
    }
}
