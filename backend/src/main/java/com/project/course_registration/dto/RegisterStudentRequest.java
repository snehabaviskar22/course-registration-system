package com.project.course_registration.dto;

public class RegisterStudentRequest {

    private String studentId;

    private String name;

    private String email;

    private String password;

    private Integer departmentId;

    private Integer year;

    private String avatar;

    public RegisterStudentRequest() {
    }

    public RegisterStudentRequest(
            String studentId,
            String name,
            String email,
            String password,
            Integer departmentId,
            Integer year,
            String avatar) {

        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.departmentId = departmentId;
        this.year = year;
        this.avatar = avatar;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String studentPassword) {
        this.password = studentPassword;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
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

}