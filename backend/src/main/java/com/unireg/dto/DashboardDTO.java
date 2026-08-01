package com.unireg.dto;

public class DashboardDTO {
    private long enrolledCount;
    private long waitlistCount;
    private long registeredCredits;
    private StudentDTO profile;

    public DashboardDTO() {
    }

    public long getEnrolledCount() { return enrolledCount; }
    public void setEnrolledCount(long enrolledCount) { this.enrolledCount = enrolledCount; }
    public long getWaitlistCount() { return waitlistCount; }
    public void setWaitlistCount(long waitlistCount) { this.waitlistCount = waitlistCount; }
    public long getRegisteredCredits() { return registeredCredits; }
    public void setRegisteredCredits(long registeredCredits) { this.registeredCredits = registeredCredits; }
    public StudentDTO getProfile() { return profile; }
    public void setProfile(StudentDTO profile) { this.profile = profile; }
}
