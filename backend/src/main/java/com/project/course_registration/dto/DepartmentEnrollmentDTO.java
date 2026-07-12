package com.project.course_registration.dto;

public class DepartmentEnrollmentDTO {

    private String department;

    private Integer enrolled;

    public DepartmentEnrollmentDTO() {
    }

    public DepartmentEnrollmentDTO(String department, Integer enrolled) {
        this.department = department;
        this.enrolled = enrolled;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getEnrolled() {
        return enrolled;
    }

    public void setEnrolled(Integer enrolled) {
        this.enrolled = enrolled;
    }
}