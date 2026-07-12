package com.project.course_registration.dto;

public class AdminLoginResponse {

    private Integer id;

    private String name;

    private String email;

    private String role;

    private String message;

    private boolean success;

    public AdminLoginResponse() {
    }

    public AdminLoginResponse(
            Integer id,
            String name,
            String email,
            String role,
            String message,
            boolean success) {

        this.id = id;
        this.name = name;
        this.email = email;
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

    public String getName() {
        return name;
    }

    public void setName(String adminName) {
        this.name = adminName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String adminEmail) {
        this.email = adminEmail;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String adminRole) {
        this.role = adminRole;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String loginMessage) {
        this.message = loginMessage;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

}