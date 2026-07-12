CREATE DATABASE course_registration_v2;

USE course_registration_v2;

select * from admin;
select * from department;
select * from activity;
select * from course;
select * from student;
select * from enrollment;

select * from course where id =1;

CREATE TABLE department(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
code VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE student(
id INT AUTO_INCREMENT PRIMARY KEY,
student_id VARCHAR(30) UNIQUE NOT NULL,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
department_id INT,
year INT,
avatar VARCHAR(255),
status ENUM('Active','Inactive') DEFAULT 'Active',
joined_date DATE,
FOREIGN KEY(department_id)
REFERENCES department(id)
);

CREATE TABLE admin(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100) UNIQUE,
password VARCHAR(255)
);

CREATE TABLE course(
id INT AUTO_INCREMENT PRIMARY KEY,
code VARCHAR(20) UNIQUE,
name VARCHAR(100),
instructor VARCHAR(100),
department_id INT,
credits INT,
capacity INT,
waitlist_capacity INT,
semester VARCHAR(30),
registration_deadline DATE,
description TEXT,
FOREIGN KEY(department_id)
REFERENCES department(id)
);

CREATE TABLE enrollment(
id INT AUTO_INCREMENT PRIMARY KEY,
student_id INT,
course_id INT,
status ENUM('ENROLLED','WAITLISTED'),
waitlist_position INT,
enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(student_id)
REFERENCES student(id),
FOREIGN KEY(course_id)
REFERENCES course(id),
UNIQUE(student_id,course_id)
);

CREATE TABLE activity(
id INT AUTO_INCREMENT PRIMARY KEY,
type ENUM(
'register','waitlist','drop','create','update','login'
),
message VARCHAR(255),
activity_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO department(name,code)
VALUES('Computer Science','CSE'),
('Information Technology','IT'),
('Electronics','ECE'),
('Mechanical','ME'),
('Civil','CE');

INSERT INTO admin(name,email,password)
VALUES('Administrator',
'admin@college.edu',
'admin123'
);

INSERT INTO student
(student_id, name, email, password, department_id, year, avatar, status, joined_date)
VALUES
('22CS001','Sneha Baviskar','sneha@college.edu','password123',1,3,
'avatars/default.png','Active','2024-06-15'),
('22CS002','Rahul Sharma','rahul@college.edu','password123',1,3,
'avatars/default.png','Active','2024-06-15'),
('22IT001','Priya Patel','priya@college.edu','password123',2,2,
'avatars/default.png','Active','2025-01-10'),
('22EC001','Arjun Singh','arjun@college.edu','password123',3,4,
'avatars/default.png','Active','2023-08-01'),
('22ME001','Riya Mehta','riya@college.edu','password123',4,1,
'avatars/default.png','Active','2026-01-05');

INSERT INTO course
(code,name,instructor,department_id,credits,
capacity,waitlist_capacity,semester,registration_deadline,description)
VALUES
('CS101','Java Programming','Dr. Anil Kumar',1,4,2,3,'Semester 5','2026-08-15',
'Learn Java programming from fundamentals to advanced concepts.'),
('CS201','Database Management','Dr. Neha Shah',1,4,2,2,'Semester 5','2026-08-15',
'Learn SQL, normalization, indexing and database design.'),
('IT301','Web Development','Prof. Amit Verma',2,3,3,2,'Semester 6','2026-08-20',
'Frontend and Backend Web Development using modern frameworks.'),
('EC101','Digital Electronics','Dr. Rakesh Gupta',3,4,2,2,'Semester 3','2026-08-18',
'Digital logic, gates, flip-flops and sequential circuits.');

INSERT INTO enrollment
(student_id,course_id,status,waitlist_position)
VALUES
(1,1,'ENROLLED',NULL),
(2,1,'ENROLLED',NULL);

INSERT INTO enrollment
(student_id,course_id,status,waitlist_position)
VALUES
(3,1,'WAITLISTED',1);

INSERT INTO enrollment
(student_id,course_id,status,waitlist_position)
VALUES
(1,2,'ENROLLED',NULL);

INSERT INTO enrollment
(student_id,course_id,status,waitlist_position)
VALUES
(4,3,'ENROLLED',NULL);

INSERT INTO activity
(type,message)
VALUES
('register',
'Sneha Baviskar registered for Java Programming'),
('register',
'Rahul Sharma registered for Java Programming'),
('waitlist',
'Priya Patel added to Java Programming waitlist'),
('register',
'Sneha Baviskar registered for Database Management'),
('login',
'Sneha Baviskar logged in'),
('create',
'Administrator created Web Development course');






