import type {
  AuthResponse,
  Course,
  CourseRequest,
  DashboardData,
  Department,
  DepartmentEnrollment,
  EnrolledCourse,
  MessageResponse,
  StatsData,
  Student,
} from './types';


// Base URL for the API, retrieved from environment variables or defaulting to localhost
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Authentication token and user information keys for local storage
const TOKEN_KEY = 'unireg_token';
const USER_KEY = 'unireg_user';

// Retrieve the stored authentication token from local storage
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

// Retrieve stored user information from local storage
export function getStoredUser(): { id: string; name: string; email: string; role: string } | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// set authentication data in local storage after successful login
export function setAuth(auth: AuthResponse) {
  localStorage.setItem(TOKEN_KEY, auth.token); // Store the authentication token in local storage
  const user = {
    id: String(auth.userId),
    name: auth.name,
    email: auth.email,
    role: auth.role,
  };
  localStorage.setItem(USER_KEY, JSON.stringify(user)); 
}

// Clear authentication data from local storage
export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// Generic request function to handle API calls with proper headers and error handling
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Make the fetch request to the API
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (res.status === 204) {
    return undefined as T;
  }

  // Attempt to parse the response as JSON, defaulting to an empty object on failure
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

// Authentication API for handling student and admin login and registration
export const authApi = {
  registerStudent: (data: {
    name: string;
    email: string;
    password: string;
    department: string;
    year: string;
    studentId: string;
  }) =>
    request<AuthResponse>('/student/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

    //student login
  loginStudent: (email: string, password: string) =>
    request<AuthResponse>('/student/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

    //admin login
  loginAdmin: (email: string, password: string) =>
    request<AuthResponse>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

// course API for fetching course data and managing enrollments
export const courseApi = {
  getAll: () => request<Course[]>('/courses'),
  getById: (id: string) => request<Course>(`/course/${id}`),
  register: (studentId: string, courseId: string) =>
    request<MessageResponse>('/course/register', {
      method: 'POST',
      body: JSON.stringify({ studentId: Number(studentId), courseId: Number(courseId) }),
    }),
  drop: (studentId: string, courseId: string) =>
    request<MessageResponse>('/course/drop', {
      method: 'POST',
      body: JSON.stringify({ studentId: Number(studentId), courseId: Number(courseId) }),
    }),
  create: (data: CourseRequest) =>
    request<Course>('/admin/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: CourseRequest) =>
    request<Course>(`/admin/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  remove: (id: string) =>
    request<void>(`/admin/courses/${id}`, { method: 'DELETE' }),
};

// student API for fetching student data and dashboard information
export const studentApi = {
  getProfile: (id: string) => request<Student>(`/student/profile/${id}`),
  updateProfile: (id: string, data: { name: string; email: string; department: string; year: string }) =>
    request<Student>(`/student/profile/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  getDashboard: (id: string) => request<DashboardData>(`/student/dashboard/${id}`),
  getMyCourses: (id: string) => request<EnrolledCourse[]>(`/student/${id}/courses`),
};

// department API for fetching department data
export const departmentApi = {
  getAll: () => request<Department[]>('/departments'),
};

// admin API for managing students and statistics
export const adminApi = {
  getStats: () => request<StatsData>('/admin/stats'),
  getEnrollmentsByDept: () => request<DepartmentEnrollment[]>('/admin/enrollments-by-department'),
  getAllStudents: () => request<Student[]>('/admin/students'),
  getStudent: (id: string) => request<Student>(`/admin/students/${id}`),
  updateStudentStatus: (id: string, status: string) =>
    request<Student>(`/admin/students/${id}?status=${encodeURIComponent(status)}`, {
      method: 'PUT',
    }),
  deleteStudent: (id: string) =>
    request<void>(`/admin/students/${id}`, { method: 'DELETE' }),
};
