package com.unireg.dto;

public class EnrollmentDTO {
    private String id;
    private String code;
    private String name;
    private String instructor;
    private String department;
    private Integer credits;
    private Integer capacity;
    private long enrolled;
    private Integer waitlistCapacity;
    private long waitlistCount;
    private String semester;
    private String deadline;
    private String description;
    private String color;
    private String icon;
    private String courseId;
    private String status;            // "ENROLLED" | "WAITLISTED"
    private String enrollmentDate;    // ISO date string
    private Integer waitlistPosition;
    private Integer waitlistTotal;

    public EnrollmentDTO() {
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public Integer getCredits() { return credits; }
    public void setCredits(Integer credits) { this.credits = credits; }
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public long getEnrolled() { return enrolled; }
    public void setEnrolled(long enrolled) { this.enrolled = enrolled; }
    public Integer getWaitlistCapacity() { return waitlistCapacity; }
    public void setWaitlistCapacity(Integer waitlistCapacity) { this.waitlistCapacity = waitlistCapacity; }
    public long getWaitlistCount() { return waitlistCount; }
    public void setWaitlistCount(long waitlistCount) { this.waitlistCount = waitlistCount; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getEnrollmentDate() { return enrollmentDate; }
    public void setEnrollmentDate(String enrollmentDate) { this.enrollmentDate = enrollmentDate; }
    public Integer getWaitlistPosition() { return waitlistPosition; }
    public void setWaitlistPosition(Integer waitlistPosition) { this.waitlistPosition = waitlistPosition; }
    public Integer getWaitlistTotal() { return waitlistTotal; }
    public void setWaitlistTotal(Integer waitlistTotal) { this.waitlistTotal = waitlistTotal; }
}
