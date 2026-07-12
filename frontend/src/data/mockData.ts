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
  id: number;
  name: string;
  email: string;
  department: string;
  year: number;
  studentId: string;
  avatar?: string;
  status: 'Active' | 'Inactive';
  enrolledCount: number;
  waitlistCount: number;
  joinedDate: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'admin';
}

export interface Activity {
  id: string;
  type: 'register' | 'waitlist' | 'drop' | 'create' | 'update' | 'login';
  message: string;
  timestamp: string;
}

export const departments = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Business',
  'Engineering',
  'Biology',
  'Psychology',
  'Literature',
];

export const semesters = ['Fall 2026', 'Spring 2027', 'Summer 2027'];

export const courses: Course[] = [
  {
    id: 'c1',
    code: 'CS-301',
    name: 'Data Structures & Algorithms',
    instructor: 'Dr. Alan Turing',
    department: 'Computer Science',
    credits: 4,
    capacity: 60,
    enrolled: 45,
    waitlistCapacity: 20,
    waitlistCount: 0,
    semester: 'Fall 2026',
    deadline: '2026-08-15',
    description: 'Fundamental data structures including trees, graphs, hash tables, and the algorithms that operate on them.',
    color: 'from-brand-500 to-brand-600',
    icon: 'Binary',
  },
  {
    id: 'c2',
    code: 'CS-410',
    name: 'Advanced Java Programming',
    instructor: 'Prof. Grace Hopper',
    department: 'Computer Science',
    credits: 3,
    capacity: 40,
    enrolled: 40,
    waitlistCapacity: 15,
    waitlistCount: 8,
    semester: 'Fall 2026',
    deadline: '2026-08-10',
    description: 'Enterprise Java development covering concurrency, streams, JVM internals, and Spring framework.',
    color: 'from-accent-orange to-amber-500',
    icon: 'Code2',
  },
  {
    id: 'c3',
    code: 'MTH-201',
    name: 'Linear Algebra',
    instructor: 'Dr. Emmy Noether',
    department: 'Mathematics',
    credits: 3,
    capacity: 50,
    enrolled: 38,
    waitlistCapacity: 10,
    waitlistCount: 0,
    semester: 'Fall 2026',
    deadline: '2026-08-20',
    description: 'Vector spaces, matrices, eigenvalues, linear transformations, and applications to computer science.',
    color: 'from-accent-purple to-fuchsia-500',
    icon: 'Sigma',
  },
  {
    id: 'c4',
    code: 'PHY-220',
    name: 'Quantum Mechanics',
    instructor: 'Dr. Richard Feynman',
    department: 'Physics',
    credits: 4,
    capacity: 35,
    enrolled: 35,
    waitlistCapacity: 12,
    waitlistCount: 5,
    semester: 'Fall 2026',
    deadline: '2026-08-12',
    description: 'Introduction to quantum theory, wave functions, operators, and measurement in modern physics.',
    color: 'from-accent-emerald to-teal-500',
    icon: 'Atom',
  },
  {
    id: 'c5',
    code: 'BUS-330',
    name: 'Financial Accounting',
    instructor: 'Prof. Warren Buffett',
    department: 'Business',
    credits: 3,
    capacity: 80,
    enrolled: 52,
    waitlistCapacity: 20,
    waitlistCount: 0,
    semester: 'Spring 2027',
    deadline: '2026-12-15',
    description: 'Principles of financial accounting, balance sheets, income statements, and cash flow analysis.',
    color: 'from-brand-600 to-indigo-600',
    icon: 'TrendingUp',
  },
  {
    id: 'c6',
    code: 'ENG-250',
    name: 'Machine Design',
    instructor: 'Dr. Nikola Tesla',
    department: 'Engineering',
    credits: 4,
    capacity: 45,
    enrolled: 30,
    waitlistCapacity: 15,
    waitlistCount: 0,
    semester: 'Fall 2026',
    deadline: '2026-08-18',
    description: 'Mechanical design principles, material selection, stress analysis, and CAD modeling.',
    color: 'from-slate-600 to-slate-800',
    icon: 'Cog',
  },
  {
    id: 'c7',
    code: 'BIO-180',
    name: 'Molecular Biology',
    instructor: 'Dr. Rosalind Franklin',
    department: 'Biology',
    credits: 3,
    capacity: 55,
    enrolled: 48,
    waitlistCapacity: 10,
    waitlistCount: 2,
    semester: 'Fall 2026',
    deadline: '2026-08-14',
    description: 'Structure and function of macromolecules, DNA replication, transcription, and protein synthesis.',
    color: 'from-accent-emerald to-green-600',
    icon: 'Dna',
  },
  {
    id: 'c8',
    code: 'PSY-210',
    name: 'Cognitive Psychology',
    instructor: 'Prof. Daniel Kahneman',
    department: 'Psychology',
    credits: 3,
    capacity: 70,
    enrolled: 65,
    waitlistCapacity: 15,
    waitlistCount: 3,
    semester: 'Spring 2027',
    deadline: '2026-12-10',
    description: 'Study of mental processes including perception, memory, reasoning, and decision-making.',
    color: 'from-accent-purple to-violet-600',
    icon: 'Brain',
  },
  {
    id: 'c9',
    code: 'CS-505',
    name: 'Machine Learning',
    instructor: 'Dr. Ada Lovelace',
    department: 'Computer Science',
    credits: 4,
    capacity: 50,
    enrolled: 50,
    waitlistCapacity: 25,
    waitlistCount: 12,
    semester: 'Spring 2027',
    deadline: '2026-12-20',
    description: 'Supervised and unsupervised learning, neural networks, and modern deep learning architectures.',
    color: 'from-brand-500 to-cyan-500',
    icon: 'Cpu',
  },
  {
    id: 'c10',
    code: 'LIT-120',
    name: 'World Literature',
    instructor: 'Prof. Jorge Borges',
    department: 'Literature',
    credits: 3,
    capacity: 40,
    enrolled: 22,
    waitlistCapacity: 10,
    waitlistCount: 0,
    semester: 'Fall 2026',
    deadline: '2026-08-22',
    description: 'Survey of literary traditions across cultures, from ancient epics to contemporary fiction.',
    color: 'from-amber-500 to-accent-orange',
    icon: 'BookOpen',
  },
  {
    id: 'c11',
    code: 'MTH-405',
    name: 'Discrete Mathematics',
    instructor: 'Dr. Carl Gauss',
    department: 'Mathematics',
    credits: 3,
    capacity: 45,
    enrolled: 41,
    waitlistCapacity: 10,
    waitlistCount: 0,
    semester: 'Fall 2026',
    deadline: '2026-08-16',
    description: 'Logic, set theory, combinatorics, graph theory, and discrete probability for computing.',
    color: 'from-accent-purple to-indigo-500',
    icon: 'Hash',
  },
  {
    id: 'c12',
    code: 'BUS-440',
    name: 'Strategic Management',
    instructor: 'Prof. Peter Drucker',
    department: 'Business',
    credits: 3,
    capacity: 60,
    enrolled: 55,
    waitlistCapacity: 15,
    waitlistCount: 1,
    semester: 'Spring 2027',
    deadline: '2026-12-18',
    description: 'Corporate strategy formulation, competitive analysis, and organizational leadership.',
    color: 'from-brand-600 to-blue-800',
    icon: 'Briefcase',
  },
];

export const myEnrollments: EnrolledCourse[] = [
  {
    ...courses[0],
    status: 'ENROLLED',
    enrollmentDate: '2026-07-10',
  },
  {
    ...courses[2],
    status: 'ENROLLED',
    enrollmentDate: '2026-07-08',
  },
  {
    ...courses[1],
    status: 'WAITLISTED',
    enrollmentDate: '2026-07-12',
    waitlistPosition: 2,
    waitlistTotal: 8,
  },
  {
    ...courses[8],
    status: 'WAITLISTED',
    enrollmentDate: '2026-07-14',
    waitlistPosition: 5,
    waitlistTotal: 12,
  },
];

export const students: Student[] = [
  {
    id: 1,
    name: 'Sneha Patel',
    email: 'sneha.patel@university.edu',
    department: 'Computer Science',
    year: 3,
    studentId: 'CS-2023-045',
    status: 'Active',
    enrolledCount: 2,
    waitlistCount: 2,
    joinedDate: '2023-08-15',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    email: 'marcus.chen@university.edu',
    department: 'Engineering',
    year: 3,
    studentId: 'ENG-2022-018',
    status: 'Active',
    enrolledCount: 4,
    waitlistCount: 1,
    joinedDate: '2022-08-15',
  },
  {
    id: 3,
    name: 'Aisha Rahman',
    email: 'aisha.rahman@university.edu',
    department: 'Biology',
    year: 1,
    studentId: 'BIO-2024-092',
    status: 'Active',
    enrolledCount: 3,
    waitlistCount: 0,
    joinedDate: '2024-08-15',
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'james.wilson@university.edu',
    department: 'Business',
    year: 2,
    studentId: 'BUS-2023-067',
    status: 'Active',
    enrolledCount: 2,
    waitlistCount: 0,
    joinedDate: '2023-08-15',
  },
  {
    id: 5,
    name: 'Elena Volkov',
    email: 'elena.volkov@university.edu',
    department: 'Physics',
    year: 3,
    studentId: 'PHY-2022-031',
    status: 'Inactive',
    enrolledCount: 0,
    waitlistCount: 0,
    joinedDate: '2022-08-15',
  },
  {
    id: 6,
    name: 'David Kim',
    email: 'david.kim@university.edu',
    department: 'Mathematics',
    year: 2,
    studentId: 'MTH-2024-054',
    status: 'Active',
    enrolledCount: 3,
    waitlistCount: 1,
    joinedDate: '2024-08-15',
  },
  {
    id: 7,
    name: 'Fatima Al-Zahra',
    email: 'fatima.zahra@university.edu',
    department: 'Psychology',
    year: 1,
    studentId: 'PSY-2023-078',
    status: 'Active',
    enrolledCount: 2,
    waitlistCount: 0,
    joinedDate: '2023-08-15',
  },
  {
    id: 8,
    name: 'Oliver Smith',
    email: 'oliver.smith@university.edu',
    department: 'Computer Science',
    year: 2,
    studentId: 'CS-2025-103',
    status: 'Active',
    enrolledCount: 1,
    waitlistCount: 1,
    joinedDate: '2025-01-15',
  },
];

export const recentActivities: Activity[] = [
  { id: 'a1', type: 'register', message: 'Registered for Data Structures & Algorithms', timestamp: '2 hours ago' },
  { id: 'a2', type: 'waitlist', message: 'Added to waitlist for Advanced Java Programming (Position 2)', timestamp: '5 hours ago' },
  { id: 'a3', type: 'waitlist', message: 'Added to waitlist for Machine Learning (Position 5)', timestamp: '1 day ago' },
  { id: 'a4', type: 'register', message: 'Registered for Linear Algebra', timestamp: '2 days ago' },
  { id: 'a5', type: 'login', message: 'Logged in from Chrome on macOS', timestamp: '3 days ago' },
];

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
