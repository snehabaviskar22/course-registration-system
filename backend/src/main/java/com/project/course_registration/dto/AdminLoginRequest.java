package com.project.course_registration.dto;

public class AdminLoginRequest {

    private String email;

    private String password;

    public AdminLoginRequest() {
    }

    public AdminLoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String adminEmail) {
        this.email = adminEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String adminPassword) {
        this.password = adminPassword;
    }

}