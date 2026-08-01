package com.unireg.controller;

import com.unireg.dto.AuthResponse;
import com.unireg.dto.LoginRequest;
import com.unireg.dto.StudentRegisterRequest;
import com.unireg.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api") // Base path for all authentication-related endpoints
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/student/register") // Endpoint to register a new student
    public ResponseEntity<AuthResponse> registerStudent(@Valid @RequestBody StudentRegisterRequest req) {
        return ResponseEntity.status(201).body(authService.registerStudent(req));
    }

    @PostMapping("/student/login") // Endpoint to log in a student
    public ResponseEntity<AuthResponse> loginStudent(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.loginStudent(req));
    }

    @PostMapping("/admin/login") // Endpoint to log in an admin
    public ResponseEntity<AuthResponse> loginAdmin(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.loginAdmin(req));
    }
}
