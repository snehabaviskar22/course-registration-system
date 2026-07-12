import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Student, AdminUser } from '../data/mockData';

type User = Student | AdminUser;

interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  login: (userData: any) => void;
  register: (data: Partial<Student>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Still used only for registration defaults
const demoStudent: Student = {
  id: 1,
  name: 'Sneha Patel',
  email: 'sneha.patel@university.edu',
  department: 'Computer Science',
  year: 1,
  studentId: 'CS-2023-045',
  status: 'Active',
  enrolledCount: 0,
  waitlistCount: 0,
  joinedDate: '2023-08-15',
};

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(() => {

    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;

  });

  const login = (userData: any) => {

    if (userData.role === "ADMIN") {

      const admin: AdminUser = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: "admin",
      };

      setUser(admin);

      localStorage.setItem("user", JSON.stringify(admin));

    } else {

      const student: Student = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        department: userData.department,
        year: userData.year,
        studentId: userData.studentId,
        status: "Active",
        enrolledCount: 0,
        waitlistCount: 0,
        joinedDate: "",
      };

      setUser(student);

      localStorage.setItem("user", JSON.stringify(student));

    }

  };

  // Keep this for now (used immediately after registration if needed)
  const register = (data: Partial<Student>) => {

    const student = {
      ...demoStudent,
      ...data,
      id: 1,
      status: 'Active',
      enrolledCount: 0,
      waitlistCount: 0,
      joinedDate: new Date().toISOString().slice(0, 10),
    } as Student;

    setUser(student);

  };

  const logout = () => {

    localStorage.removeItem("user");

    setUser(null);

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: (user as AdminUser | null)?.role === 'admin',
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;

}