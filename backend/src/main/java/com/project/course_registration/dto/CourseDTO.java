package com.project.course_registration.dto;
import java.time.LocalDate;

public class CourseDTO {

    private Integer id;

    private String code;

    private String name;

    private String instructor;

    private String department;

    private Integer credits;

    private Integer capacity;

    private Integer enrolled;

    private Integer waitlistCapacity;

    private Integer waitlistCount;

    private String semester;

    private LocalDate registrationDeadline;

    private String description;

    private String status;

    public CourseDTO() {
    }

    public CourseDTO(Integer id,
                     String code,
                     String name,
                     String instructor,
                     String department,
                     Integer credits,
                     Integer capacity,
                     Integer enrolled,
                     Integer waitlistCapacity,
                     Integer waitlistCount,
                     String semester,
                     LocalDate registrationDeadline,
                     String description,
                     String status) {

        this.id = id;
        this.code = code;
        this.name = name;
        this.instructor = instructor;
        this.department = department;
        this.credits = credits;
        this.capacity = capacity;
        this.enrolled = enrolled;
        this.waitlistCapacity = waitlistCapacity;
        this.waitlistCount = waitlistCount;
        this.semester = semester;
        this.registrationDeadline = registrationDeadline;
        this.description = description;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String courseName) {
        this.name = courseName;
    }

    public String getInstructor() {
        return instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String departmentName) {
        this.department = departmentName;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getEnrolled() {
        return enrolled;
    }

    public void setEnrolled(Integer enrolled) {
        this.enrolled = enrolled;
    }

    public Integer getWaitlistCapacity() {
        return waitlistCapacity;
    }

    public void setWaitlistCapacity(Integer waitlistCapacity) {
        this.waitlistCapacity = waitlistCapacity;
    }

    public Integer getWaitlistCount() {
        return waitlistCount;
    }

    public void setWaitlistCount(Integer waitlistCount) {
        this.waitlistCount = waitlistCount;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public LocalDate getRegistrationDeadline() {
    return registrationDeadline;
    }

    public void setRegistrationDeadline(LocalDate registrationDeadline) {
        this.registrationDeadline = registrationDeadline;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String courseDescription) {
        this.description = courseDescription;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String courseStatus) {
        this.status = courseStatus;
    }

}