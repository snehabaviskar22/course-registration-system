export type CourseStatus = 'OPEN' | 'LIMITED' | 'FULL' | 'WAITLIST';

export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  department: string;
  credits: number;
  capacity: number;
  enrolled: number;
  waitlistCapacity: number;
  waitlistCount: number;
  semester: string;
  deadline: string;
  description: string;
  color: string;
  icon: string;
}

export interface EnrolledCourse extends Course {
  status: 'ENROLLED' | 'WAITLISTED';
  enrollmentDate: string;
  waitlistPosition?: number;
  waitlistTotal?: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  year: string;
  studentId: string;
  avatar?: string;
  status: 'Active' | 'Inactive';
  enrolledCount: number;
  waitlistCount: number;
  joinedDate: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}

export interface Department {
  id: number;
  name: string;
}

export interface AuthResponse {
  token: string;
  role: string;
  userId: number;
  name: string;
  email: string;
}

export interface DashboardData {
  enrolledCount: number;
  waitlistCount: number;
  registeredCredits: number;
  profile: Student;
}

export interface StatsData {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  totalWaitlisted: number;
}

export interface DepartmentEnrollment {
  department: string;
  enrolled: number;
  courseCount: number;
}

export interface MessageResponse {
  message: string;
  status: string;
}

export interface CourseRequest {
  name: string;
  code: string;
  instructor: string;
  department: string;
  semester: string;
  credits: number;
  capacity: number;
  waitlistCapacity: number;
  registrationDeadline: string;
  description: string;
  color?: string;
  icon?: string;
}

export const semesters = ['Fall 2026', 'Spring 2027', 'Summer 2027'];

export function getCourseStatus(course: Course): CourseStatus {
  const available = course.capacity - course.enrolled;
  if (available > 10) return 'OPEN';
  if (available > 0) return 'LIMITED';
  if (course.waitlistCount < course.waitlistCapacity) return 'WAITLIST';
  return 'FULL';
}

export function getSeatsLeft(course: Course): number {
  return Math.max(0, course.capacity - course.enrolled);
}
