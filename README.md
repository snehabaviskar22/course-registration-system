# Course Registration System

A full-stack **Course Registration System** developed to streamline the academic course enrollment process for students and administrators. The application enables students to browse available courses, register for courses, manage their profile, and view their academic information through a modern web interface.

## Features

### Student Module

* Secure student login
* Dashboard with academic overview
* Browse available courses
* Search and filter courses by department and semester
* Course registration
* Student profile management
* View enrolled courses
* Responsive user interface

### Admin Module

* Admin login
* Dashboard with system overview
* Manage students
* Manage courses
* Manage departments
* View registrations
* Administrative controls

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Lucide React
* Fetch API

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Spring Security
* Maven

### Database

* MySQL

## Project Structure

```
Course Registration System/
│
├── backend/                 # Spring Boot Backend
│
├── frontend/                # React Frontend
│
└── ver2 course reg system.sql   # MySQL Database
```

## Prerequisites

Before running the project, ensure the following software is installed:

* Java 21 or later
* Maven
* Node.js (v18 or later)
* npm
* MySQL Server
* Git

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Course-Registration-System
```

### 2. Import Database

* Create a MySQL database.
* Import the provided SQL file:

```
ver2 course reg system.sql
```

* Update the database configuration inside:

```
backend/src/main/resources/application.properties
```

with your MySQL username and password.

### 3. Run the Backend

Navigate to the backend folder:

```bash
cd backend
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend will start on:

```
http://localhost:8080
```

### 4. Run the Frontend

Open another terminal.

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will start on:

```
http://localhost:5173
```

## Future Enhancements

* Forgot Password functionality
* Email notifications
* Student registration approval
* Advanced course registration validation
* Attendance management
* Result management
* Faculty module
* Improved analytics dashboard

## Author

**Sneha R. Baviskar**

MCA Student

## License

This project is developed for educational and academic purposes.
