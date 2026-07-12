package com.project.course_registration.dto;

import com.project.course_registration.enums.UserRole;

public class LoginResponse {

    private Integer id;

    private String studentId;

    private String name;

    private String email;

    private String department;

    private Integer year;

    private String avatar;

    private UserRole role;

    private String message;

    private boolean success;

    public LoginResponse() {
    }

    public LoginResponse(Integer id,
                         String studentId,
                         String name,
                         String email,
                         String department,
                         Integer year,
                         String avatar,
                         UserRole role,
                         String message,
                         boolean success) {

        this.id = id;
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.department = department;
        this.year = year;
        this.avatar = avatar;
        this.role = role;
        this.message = message;
        this.success = success;
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

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
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

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}