package com.unireg.service;

import com.unireg.dto.AuthResponse;
import com.unireg.dto.LoginRequest;
import com.unireg.dto.StudentRegisterRequest;
import com.unireg.entity.Admin;
import com.unireg.entity.Student;
import com.unireg.exception.BadRequestException;
import com.unireg.exception.ConflictException;
import com.unireg.repository.AdminRepository;
import com.unireg.repository.StudentRepository;
import com.unireg.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class AuthService {

    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(StudentRepository studentRepository,
                       AdminRepository adminRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.studentRepository = studentRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // Register a new student
    public AuthResponse registerStudent(StudentRegisterRequest req) {
        if (studentRepository.existsByEmail(req.getEmail())) {
            throw new ConflictException("Email already registered");
        }
        if (studentRepository.existsByStudentId(req.getStudentId())) {
            throw new ConflictException("Student ID already exists");
        }

        Student student = new Student();
        student.setStudentId(req.getStudentId());
        student.setName(req.getName());
        student.setEmail(req.getEmail());
        student.setPassword(passwordEncoder.encode(req.getPassword()));
        student.setDepartment(req.getDepartment());
        student.setYear(req.getYear());
        student.setAvatar(req.getAvatar());
        student.setStatus("Active");
        student.setJoinedDate(LocalDate.now());

        Student saved = studentRepository.save(student);

        String token = jwtUtil.generateToken(saved.getId(), saved.getEmail(), saved.getName(), "student");
        return new AuthResponse(token, "student", saved.getId(), saved.getName(), saved.getEmail());
    }

    // Login methods for both students 
    public AuthResponse loginStudent(LoginRequest req) {
        Student student = studentRepository.findByEmail(req.getEmail()) // verify if the email exists in the database
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), student.getPassword())) {  // verify if the password matches the hashed password in the database
            throw new BadRequestException("Invalid email or password");
        }

        // Generate JWT token for the authenticated student
        String token = jwtUtil.generateToken(student.getId(), student.getEmail(), student.getName(), "student");
        return new AuthResponse(token, "student", student.getId(), student.getName(), student.getEmail());
    }

    // Login method for admin
    public AuthResponse loginAdmin(LoginRequest req) {
        Admin admin = adminRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), admin.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(admin.getId(), admin.getEmail(), admin.getName(), "admin");
        return new AuthResponse(token, "admin", admin.getId(), admin.getName(), admin.getEmail());
    }
}
