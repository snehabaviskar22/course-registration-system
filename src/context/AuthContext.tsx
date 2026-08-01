import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Student, AdminUser } from '../data/types';
import { authApi, setAuth, clearAuth, getStoredUser } from '../data/api';

// Define a union type for User, which can be either a Student or an AdminUser
type User = Student | AdminUser;


interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string, asAdmin?: boolean) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    department: string;
    year: string;
    studentId: string;
  }) => Promise<void>;
  logout: () => void;
}

// Create the AuthContext with an undefined default value
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Helper function to create a User object based on role
function makeUser(id: string, name: string, email: string, role: string): User {
  if (role === 'admin') {
    return { id, name, email, role: 'admin' } as AdminUser;
  }
  return {
    id,
    name,
    email,
    department: '',
    year: '',
    studentId: '',
    status: 'Active',
    enrolledCount: 0,
    waitlistCount: 0,
    joinedDate: '',
  } as Student;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => { // Initialize user state from local storage if available
    const stored = getStoredUser(); // Retrieve stored user data from local storage
    if (stored) return makeUser(stored.id, stored.name, stored.email, stored.role);
    return null;
  });
  const [loading, setLoading] = useState(false);

  // Login function for both students and admins
  const login = async (email: string, password: string, asAdmin = false) => {
    setLoading(true);
    try {
      const auth = asAdmin
        ? await authApi.loginAdmin(email, password)
        : await authApi.loginStudent(email, password);
      setAuth(auth); // Store authentication data in local storage
      setUser(makeUser(String(auth.userId), auth.name, auth.email, auth.role));
    } finally {
      setLoading(false);
    }
  };

  // Register function for new students
  const register = async (data: {
    name: string;
    email: string;
    password: string;
    department: string;
    year: string;
    studentId: string;
  }) => {
    setLoading(true);
    try {
      const auth = await authApi.registerStudent(data);
      setAuth(auth);
      setUser(makeUser(String(auth.userId), auth.name, auth.email, auth.role));
    } finally {
      setLoading(false);
    }
  };

  // Logout function to clear authentication data and reset user state
  const logout = () => {
    clearAuth();
    setUser(null);
  };

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider
      value={{ user, isAdmin: (user as AdminUser | null)?.role === 'admin', loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the AuthContext
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
