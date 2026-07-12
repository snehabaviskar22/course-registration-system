package com.project.course_registration.dto;

public class ChangePasswordRequest {

    private Integer studentId;

    private String currentPassword;

    private String newPassword;

    private String confirmPassword;

    public ChangePasswordRequest() {
    }

    public ChangePasswordRequest(Integer studentId,
                                 String currentPassword,
                                 String newPassword,
                                 String confirmPassword) {
        this.studentId = studentId;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}