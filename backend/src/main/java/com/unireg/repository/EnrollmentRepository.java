package com.unireg.repository;

import com.unireg.entity.Enrollment;
import com.unireg.entity.Student;
import com.unireg.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByStudent(Student student);

    Optional<Enrollment> findByStudentAndCourse(Student student, Course course);

    long countByCourseAndStatus(Course course, Enrollment.Status status);

    @Query("SELECT e FROM Enrollment e WHERE e.course = :course AND e.status = :status ORDER BY e.waitlistPosition ASC")
    List<Enrollment> findWaitlistByCourse(@Param("course") Course course, @Param("status") Enrollment.Status status);

    @Query("SELECT e FROM Enrollment e WHERE e.course = :course ORDER BY e.waitlistPosition ASC")
    List<Enrollment> findWaitlistOrdered(@Param("course") Course course);

    long countByStudentAndStatus(Student student, Enrollment.Status status);

    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.course.department = :department AND e.status = 'ENROLLED'")
    long countEnrolledByDepartment(@Param("department") String department);

    @Query("SELECT COUNT(c) FROM Course c WHERE c.department = :department")
    long countCoursesByDepartment(@Param("department") String department);

    long countByStatus(Enrollment.Status status);
}
