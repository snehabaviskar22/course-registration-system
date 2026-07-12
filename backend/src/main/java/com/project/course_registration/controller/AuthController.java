package com.project.course_registration.controller;

import com.project.course_registration.dto.LoginRequest;
import com.project.course_registration.dto.LoginResponse;
import com.project.course_registration.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginStudent(
            @RequestBody LoginRequest request) {

        LoginResponse response = authService.loginStudent(request);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

}