package com.project.course_registration.dto;

public class RegisterCourseRequest {

    private Integer studentId;

    private Integer courseId;

    public RegisterCourseRequest() {
    }

    public RegisterCourseRequest(Integer studentId, Integer courseId) {
        this.studentId = studentId;
        this.courseId = courseId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

}