package com.project.course_registration.dto;

public class StudentProfileDTO {

    private Integer id;

    private String studentId;

    private String name;

    private String email;

    private String department;

    private Integer year;

    private String avatar;

    public StudentProfileDTO() {
    }

    public StudentProfileDTO(
            Integer id,
            String studentId,
            String name,
            String email,
            String department,
            Integer year,
            String avatar) {

        this.id = id;
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.department = department;
        this.year = year;
        this.avatar = avatar;
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
}