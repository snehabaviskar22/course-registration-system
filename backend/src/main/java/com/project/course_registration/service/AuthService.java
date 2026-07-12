package com.project.course_registration.service;

import com.project.course_registration.dto.LoginRequest;
import com.project.course_registration.dto.LoginResponse;
import com.project.course_registration.entity.Student;
import com.project.course_registration.enums.UserRole;
import com.project.course_registration.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse loginStudent(LoginRequest request) {

        Student student = studentRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                student.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        LoginResponse response = new LoginResponse();

        response.setId(student.getId());
        response.setStudentId(student.getStudentId());
        response.setName(student.getName());
        response.setEmail(student.getEmail());
        response.setDepartment(student.getDepartment().getName());
        response.setYear(student.getYear());
        response.setAvatar(student.getAvatar());
        response.setRole(UserRole.STUDENT);
        response.setSuccess(true);
        response.setMessage("Login Successful");

        return response;
    }

}