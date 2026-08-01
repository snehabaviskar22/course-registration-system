package com.unireg.dto;

public class StatsDTO {
    private long totalStudents;
    private long totalCourses;
    private long totalEnrollments;
    private long totalWaitlisted;

    public StatsDTO() {
    }

    public StatsDTO(long totalStudents, long totalCourses, long totalEnrollments, long totalWaitlisted) {
        this.totalStudents = totalStudents;
        this.totalCourses = totalCourses;
        this.totalEnrollments = totalEnrollments;
        this.totalWaitlisted = totalWaitlisted;
    }

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }
    public long getTotalCourses() { return totalCourses; }
    public void setTotalCourses(long totalCourses) { this.totalCourses = totalCourses; }
    public long getTotalEnrollments() { return totalEnrollments; }
    public void setTotalEnrollments(long totalEnrollments) { this.totalEnrollments = totalEnrollments; }
    public long getTotalWaitlisted() { return totalWaitlisted; }
    public void setTotalWaitlisted(long totalWaitlisted) { this.totalWaitlisted = totalWaitlisted; }
}
