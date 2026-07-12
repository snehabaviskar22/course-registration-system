package com.project.course_registration.dto;

import java.util.List;

public class AdminDashboardDTO {

    private Long totalStudents;

    private Long totalCourses;

    private Long totalEnrollments;

    private Long totalWaitlisted;

    private List<DepartmentEnrollmentDTO> departmentEnrollments;

    public AdminDashboardDTO() {
    }

    public AdminDashboardDTO(
            Long totalStudents,
            Long totalCourses,
            Long totalEnrollments,
            Long totalWaitlisted,
            List<DepartmentEnrollmentDTO> departmentEnrollments) {

        this.totalStudents = totalStudents;
        this.totalCourses = totalCourses;
        this.totalEnrollments = totalEnrollments;
        this.totalWaitlisted = totalWaitlisted;
        this.departmentEnrollments = departmentEnrollments;
    }

    public Long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(Long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public Long getTotalCourses() {
        return totalCourses;
    }

    public void setTotalCourses(Long totalCourses) {
        this.totalCourses = totalCourses;
    }

    public Long getTotalEnrollments() {
        return totalEnrollments;
    }

    public void setTotalEnrollments(Long totalEnrollments) {
        this.totalEnrollments = totalEnrollments;
    }

    public Long getTotalWaitlisted() {
        return totalWaitlisted;
    }

    public void setTotalWaitlisted(Long totalWaitlisted) {
        this.totalWaitlisted = totalWaitlisted;
    }

    public List<DepartmentEnrollmentDTO> getDepartmentEnrollments() {
        return departmentEnrollments;
    }

    public void setDepartmentEnrollments(List<DepartmentEnrollmentDTO> departmentEnrollments) {
        this.departmentEnrollments = departmentEnrollments;
    }

}