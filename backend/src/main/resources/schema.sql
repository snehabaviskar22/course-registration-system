-- ============================================================
-- UniReg Database Schema & Seed Data
-- Database: unireg_db (auto-created via JDBC URL)
-- ============================================================

-- ---------- Tables ----------
CREATE TABLE IF NOT EXISTS departments (
    id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS admins (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id  VARCHAR(255) NOT NULL UNIQUE,
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    department  VARCHAR(255),
    year        VARCHAR(255),
    avatar      VARCHAR(255),
    status      VARCHAR(20)  NOT NULL DEFAULT 'Active',
    joined_date DATE
);

CREATE TABLE IF NOT EXISTS courses (
    id                   BIGINT AUTO_INCREMENT PRIMARY KEY,
    code                 VARCHAR(255) NOT NULL UNIQUE,
    name                 VARCHAR(255) NOT NULL,
    instructor           VARCHAR(255),
    department           VARCHAR(255),
    credits              INT,
    capacity             INT,
    waitlist_capacity    INT,
    semester             VARCHAR(255),
    registration_deadline DATE,
    description          TEXT,
    color                VARCHAR(255),
    icon                 VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS enrollments (
    id                BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id        BIGINT,
    course_id         BIGINT,
    status            VARCHAR(20),
    enrollment_date   DATE,
    waitlist_position INT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id)  REFERENCES courses(id)  ON DELETE CASCADE
);

-- ---------- Seed: Departments (8) ----------
INSERT IGNORE INTO departments (id, name) VALUES
(1, 'Computer Science'),
(2, 'Mathematics'),
(3, 'Physics'),
(4, 'Business'),
(5, 'Engineering'),
(6, 'Biology'),
(7, 'Psychology'),
(8, 'Literature');

-- ---------- Seed: Admin (1) ----------
-- password = BCrypt hash of "admin123"
INSERT IGNORE INTO admins (id, name, email, password) VALUES
(1, 'Admin Registrar', 'admin@university.edu',
 '$2a$10$nhxFFm9exo75S5pwBdrR3.1eJXQY35R/6GsBh5wIgdBEG3nPm5jy.');

-- ---------- Seed: Students (8) ----------
-- password = BCrypt hash of "student123"
INSERT IGNORE INTO students (id, student_id, name, email, password, department, year, avatar, status, joined_date) VALUES
(1, 'CS-2023-045',  'Sneha Patel',      'sneha.patel@university.edu',      '$2a$10$etElNI6QBVlWAjPCnF7ZA.HCbJ.x3Qg.KNcELXm.JexsA/1W2fxp6', 'Computer Science', 'Junior',    NULL, 'Active',   '2023-08-15'),
(2, 'ENG-2022-018', 'Marcus Chen',      'marcus.chen@university.edu',      '$2a$10$etElNI6QBVlWAjPCnF7ZA.HCbJ.x3Qg.KNcELXm.JexsA/1W2fxp6', 'Engineering',      'Senior',    NULL, 'Active',   '2022-08-15'),
(3, 'BIO-2024-092', 'Aisha Rahman',     'aisha.rahman@university.edu',     '$2a$10$etElNI6QBVlWAjPCnF7ZA.HCbJ.x3Qg.KNcELXm.JexsA/1W2fxp6', 'Biology',          'Sophomore', NULL, 'Active',   '2024-08-15'),
(4, 'BUS-2023-067', 'James Wilson',     'james.wilson@university.edu',     '$2a$10$etElNI6QBVlWAjPCnF7ZA.HCbJ.x3Qg.KNcELXm.JexsA/1W2fxp6', 'Business',         'Junior',    NULL, 'Active',   '2023-08-15'),
(5, 'PHY-2022-031', 'Elena Volkov',     'elena.volkov@university.edu',     '$2a$10$etElNI6QBVlWAjPCnF7ZA.HCbJ.x3Qg.KNcELXm.JexsA/1W2fxp6', 'Physics',          'Senior',    NULL, 'Inactive', '2022-08-15'),
(6, 'MTH-2024-054', 'David Kim',        'david.kim@university.edu',        '$2a$10$etElNI6QBVlWAjPCnF7ZA.HCbJ.x3Qg.KNcELXm.JexsA/1W2fxp6', 'Mathematics',      'Sophomore', NULL, 'Active',   '2024-08-15'),
(7, 'PSY-2023-078', 'Fatima Al-Zahra',  'fatima.zahra@university.edu',     '$2a$10$etElNI6QBVlWAjPCnF7ZA.HCbJ.x3Qg.KNcELXm.JexsA/1W2fxp6', 'Psychology',       'Junior',    NULL, 'Active',   '2023-08-15'),
(8, 'CS-2025-103',  'Oliver Smith',     'oliver.smith@university.edu',     '$2a$10$etElNI6QBVlWAjPCnF7ZA.HCbJ.x3Qg.KNcELXm.JexsA/1W2fxp6', 'Computer Science', 'Freshman',  NULL, 'Active',   '2025-01-15');

-- ---------- Seed: Courses (12) ----------
INSERT IGNORE INTO courses (id, code, name, instructor, department, credits, capacity, waitlist_capacity, semester, registration_deadline, description, color, icon) VALUES
(1, 'CS-301',  'Data Structures & Algorithms', 'Dr. Alan Turing',       'Computer Science', 4, 60, 20, 'Fall 2026',   '2026-08-15', 'Fundamental data structures including trees, graphs, hash tables, and the algorithms that operate on them.',                         'from-brand-500 to-brand-600',          'Binary'),
(2, 'CS-410',  'Advanced Java Programming',    'Prof. Grace Hopper',    'Computer Science', 3, 40, 15, 'Fall 2026',   '2026-08-10', 'Enterprise Java development covering concurrency, streams, JVM internals, and Spring framework.',                                    'from-accent-orange to-amber-500',      'Code2'),
(3, 'MTH-201', 'Linear Algebra',               'Dr. Emmy Noether',      'Mathematics',      3, 50, 10, 'Fall 2026',   '2026-08-20', 'Vector spaces, matrices, eigenvalues, linear transformations, and applications to computer science.',                              'from-accent-purple to-fuchsia-500',    'Sigma'),
(4, 'PHY-220', 'Quantum Mechanics',            'Dr. Richard Feynman',   'Physics',          4, 35, 12, 'Fall 2026',   '2026-08-12', 'Introduction to quantum theory, wave functions, operators, and measurement in modern physics.',                                    'from-accent-emerald to-teal-500',      'Atom'),
(5, 'BUS-330', 'Financial Accounting',         'Prof. Warren Buffett',  'Business',         3, 80, 20, 'Spring 2027', '2026-12-15', 'Principles of financial accounting, balance sheets, income statements, and cash flow analysis.',                                   'from-brand-600 to-indigo-600',         'TrendingUp'),
(6, 'ENG-250', 'Machine Design',               'Dr. Nikola Tesla',      'Engineering',      4, 45, 15, 'Fall 2026',   '2026-08-18', 'Mechanical design principles, material selection, stress analysis, and CAD modeling.',                                             'from-slate-600 to-slate-800',          'Cog'),
(7, 'BIO-180', 'Molecular Biology',            'Dr. Rosalind Franklin', 'Biology',          3, 55, 10, 'Fall 2026',   '2026-08-14', 'Structure and function of macromolecules, DNA replication, transcription, and protein synthesis.',                                'from-accent-emerald to-green-600',     'Dna'),
(8, 'PSY-210', 'Cognitive Psychology',         'Prof. Daniel Kahneman', 'Psychology',       3, 70, 15, 'Spring 2027', '2026-12-10', 'Study of mental processes including perception, memory, reasoning, and decision-making.',                                          'from-accent-purple to-violet-600',     'Brain'),
(9, 'CS-505',  'Machine Learning',             'Dr. Ada Lovelace',      'Computer Science', 4, 50, 25, 'Spring 2027', '2026-12-20', 'Supervised and unsupervised learning, neural networks, and modern deep learning architectures.',                                   'from-brand-500 to-cyan-500',           'Cpu'),
(10,'LIT-120', 'World Literature',             'Prof. Jorge Borges',    'Literature',       3, 40, 10, 'Fall 2026',   '2026-08-22', 'Survey of literary traditions across cultures, from ancient epics to contemporary fiction.',                                       'from-amber-500 to-accent-orange',      'BookOpen'),
(11,'MTH-405', 'Discrete Mathematics',         'Dr. Carl Gauss',        'Mathematics',      3, 45, 10, 'Fall 2026',   '2026-08-16', 'Logic, set theory, combinatorics, graph theory, and discrete probability for computing.',                                          'from-accent-purple to-indigo-500',     'Hash'),
(12,'BUS-440', 'Strategic Management',         'Prof. Peter Drucker',   'Business',         3, 60, 15, 'Spring 2027', '2026-12-18', 'Corporate strategy formulation, competitive analysis, and organizational leadership.',                                             'from-brand-600 to-blue-800',           'Briefcase');

-- ---------- Seed: Sample Enrollments ----------
INSERT IGNORE INTO enrollments (id, student_id, course_id, status, enrollment_date, waitlist_position) VALUES
-- Sneha Patel (1)
(1,  1, 1,  'ENROLLED',   '2026-07-10', NULL),
(2,  1, 3,  'ENROLLED',   '2026-07-08', NULL),
(3,  1, 2,  'WAITLISTED', '2026-07-12', 1),
(4,  1, 9,  'WAITLISTED', '2026-07-14', 1),
-- Marcus Chen (2)
(5,  2, 2,  'ENROLLED',   '2026-07-05', NULL),
(6,  2, 6,  'ENROLLED',   '2026-07-05', NULL),
(7,  2, 4,  'ENROLLED',   '2026-07-06', NULL),
(8,  2, 11, 'ENROLLED',   '2026-07-06', NULL),
(9,  2, 9,  'WAITLISTED', '2026-07-09', 2),
-- Aisha Rahman (3)
(10, 3, 7,  'ENROLLED',   '2026-07-11', NULL),
(11, 3, 8,  'ENROLLED',   '2026-07-11', NULL),
(12, 3, 10, 'ENROLLED',   '2026-07-11', NULL),
-- James Wilson (4)
(13, 4, 5,  'ENROLLED',   '2026-07-07', NULL),
(14, 4, 12, 'ENROLLED',   '2026-07-07', NULL),
-- David Kim (6)
(15, 6, 3,  'ENROLLED',   '2026-07-09', NULL),
(16, 6, 11, 'ENROLLED',   '2026-07-09', NULL),
(17, 6, 1,  'ENROLLED',   '2026-07-09', NULL),
(18, 6, 7,  'WAITLISTED', '2026-07-13', 1),
-- Fatima Al-Zahra (7)
(19, 7, 8,  'ENROLLED',   '2026-07-10', NULL),
(20, 7, 10, 'ENROLLED',   '2026-07-10', NULL),
-- Oliver Smith (8)
(21, 8, 1,  'ENROLLED',   '2026-01-20', NULL),
(22, 8, 9,  'WAITLISTED', '2026-01-22', 3);
