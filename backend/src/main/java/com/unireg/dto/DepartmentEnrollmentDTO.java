package com.unireg.dto;

public class DepartmentEnrollmentDTO {
    private String department;
    private long enrolledCount;
    private long courseCount;

    public DepartmentEnrollmentDTO() {
    }

    public DepartmentEnrollmentDTO(String department, long enrolledCount, long courseCount) {
        this.department = department;
        this.enrolledCount = enrolledCount;
        this.courseCount = courseCount;
    }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public long getEnrolledCount() { return enrolledCount; }
    public void setEnrolledCount(long enrolledCount) { this.enrolledCount = enrolledCount; }
    public long getCourseCount() { return courseCount; }
    public void setCourseCount(long courseCount) { this.courseCount = courseCount; }
}
