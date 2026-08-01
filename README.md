# UniReg – Course Registration System with Waitlist Logic

A full-stack university course registration platform that enables students to enroll in courses, manage their academic profile, and automatically join a waitlist when courses reach maximum capacity. The system also provides an administrative portal to manage students, courses, and registrations.

---

# Live Demo

**Link:https://reasonable-purpose-production-17cd.up.railway.app/#/**

---

# Objectives

The main objectives of this project are:

- Automate the university course registration process.
- Eliminate manual enrollment management.
- Implement an intelligent waitlist system for full courses.
- Secure all protected APIs using JWT Authentication.
- Build a responsive, modern web application using React and Spring Boot.

---

# Features

## Student Module

- Student Registration & Login
- Secure JWT Authentication
- Dashboard with enrollments
- Browse available courses
- Register for courses
- Automatic waitlist if seats are full
- Drop registered courses
- View enrolled and waitlisted courses
- Edit profile information
- Search and filter courses

---

## Admin Module

- Secure Admin Login
- Dashboard with analytics
- Add, Edit and Delete Courses
- Manage Students
- View Department-wise Enrollments
- Monitor Registrations
- Manage Course Capacities

---

## Waitlist Logic

The system automatically manages waitlisted students.

- If seats are available → Student is enrolled.
- If course is full → Student joins the waitlist.
- Duplicate registrations are prevented.
- Registration deadline is validated.
- Dropping a course automatically promotes the first waitlisted student.
- Waitlist positions are automatically updated.

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Context API
- Fetch API

## Backend

- Java 17
- Spring Boot 3
- Spring Security
- Spring Data JPA
- JWT Authentication
- Maven

## Database

- MySQL

---

# Project Structure

```
UniReg/
│
├── backend/
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
│
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── data/
│   └── main.tsx
│
├── package.json
├── vite.config.ts
└── README.md
```

---

# Database Design

### Tables

- Admins
- Students
- Departments
- Courses
- Enrollments

### Relationships

- One Student → Many Enrollments
- One Course → Many Enrollments
- Enrollment acts as a bridge table between Students and Courses.

---

# Authentication

- JWT Token based Authentication
- BCrypt Password Encryption
- Stateless Session Management
- Protected REST APIs
- Role-based Access (Student/Admin)

---

# API Endpoints

## Authentication

- POST `/api/student/register`
- POST `/api/student/login`
- POST `/api/admin/login`

## Student

- GET `/api/student/profile/{id}`
- PUT `/api/student/profile/{id}`
- GET `/api/student/dashboard/{id}`
- GET `/api/student/{id}/courses`

## Courses

- GET `/api/courses`
- GET `/api/course/{id}`
- POST `/api/course/register`
- POST `/api/course/drop`

## Admin

- GET `/api/admin/stats`
- GET `/api/admin/students`
- POST `/api/admin/courses`
- PUT `/api/admin/courses/{id}`
- DELETE `/api/admin/courses/{id}`

---

# Setup Instructions

## Prerequisites

- Java 17+
- Maven
- Node.js 18+
- MySQL 8+
- Git

---

## Clone Repository

```bash
git clone <repository-url>
cd UniReg
```

---

## Backend Setup

Navigate to backend

```bash
cd backend
```

Configure MySQL credentials in

```
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/unireg_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

Run the backend

```bash
mvn spring-boot:run
```

Backend URL

```
http://localhost:8080
```

---

## Frontend Setup

Open another terminal

Install dependencies

```bash
npm install
```

Configure

```
.env
```

```env
VITE_API_URL=http://localhost:8080/api
```

Run frontend

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# Demo Credentials

## Admin

Email

```
admin@university.edu
```

Password

```
admin123
```


---

# Screenshots

## Home Page

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/11dadc50-7d9f-40a4-baec-1080cc6fd615" />


---

## Student Dashboard

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9b40023b-1be0-4ded-9e10-5fe0fc65a951" />


---

## Course Registration

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7b544217-bfb6-4dea-ab0e-3373f6a0daaa" />


---


## Admin Dashboard

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/223b888b-16d8-4a14-8ee9-ec69685f6cc9" />


---

## Student Management

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1ae1d9ad-51c9-4480-8d94-c45510bdc464" />


---

## Course Management

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b6036df4-b25e-4c17-8f73-2e72283d1ab0" />


---

# Future Enhancements

- Email Notifications
- Forgot Password
- Faculty Portal
- Student Performance Analytics
- Multi-University Support

---

# Author

**Sneha Baviskar**

MCA Student

Savitribai Phule Pune University

---

# License

This project is developed for academic and educational purposes.
