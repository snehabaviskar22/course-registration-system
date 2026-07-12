package com.project.course_registration.dto;

public class StudentDashboardDTO {

    private Integer id;

    private String studentId;

    private String name;

    private String email;

    private String department;

    private Integer year;

    private String avatar;

    private String status;

    private Integer enrolledCount;

    private Integer waitlistCount;

    public StudentDashboardDTO() {
    }

    public StudentDashboardDTO(
            Integer id,
            String studentId,
            String name,
            String email,
            String department,
            Integer year,
            String avatar,
            String status,
            Integer enrolledCount,
            Integer waitlistCount) {

        this.id = id;
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.department = department;
        this.year = year;
        this.avatar = avatar;
        this.status = status;
        this.enrolledCount = enrolledCount;
        this.waitlistCount = waitlistCount;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String studentName) {
        this.name = studentName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String studentEmail) {
        this.email = studentEmail;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String departmentName) {
        this.department = departmentName;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String studentStatus) {
        this.status = studentStatus;
    }

    public Integer getEnrolledCount() {
        return enrolledCount;
    }

    public void setEnrolledCount(Integer enrolledCount) {
        this.enrolledCount = enrolledCount;
    }

    public Integer getWaitlistCount() {
        return waitlistCount;
    }

    public void setWaitlistCount(Integer waitlistCount) {
        this.waitlistCount = waitlistCount;
    }

}