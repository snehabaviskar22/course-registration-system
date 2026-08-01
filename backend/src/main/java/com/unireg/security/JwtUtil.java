package com.unireg.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;


// Utility class for generating and validating JWT tokens
@Component
public class JwtUtil {

    // Secret key and expiration time for JWT tokens, injected from application properties
    @Value("${app.jwt.secret}")
    private String secret;

    // Expiration time for JWT tokens in milliseconds, injected from application properties
    @Value("${app.jwt.expiration}")
    private long expirationMs;

    // Generate a secret key for signing JWT tokens using the provided secret
    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // Generate a JWT token with user details and role
    public String generateToken(Long userId, String email, String name, String role) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("email", email)
                .claim("name", name)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(getKey())
                .compact();
    }

    // Parse a JWT token and extract claims
    public Claims parseToken(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Validate a JWT token by attempting to parse it; returns true if valid, false otherwise
    public boolean validateToken(String token) {
        try {
            parseToken(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Extract the user ID from a JWT token
    public Long extractUserId(String token) {
        Claims claims = parseToken(token);
        return Long.parseLong(claims.getSubject());
    }

    // Extract the email from a JWT token
    public String extractEmail(String token) {
        return parseToken(token).get("email", String.class);
    }
    
    // Extract the role from a JWT token
    public String extractRole(String token) {
        return parseToken(token).get("role", String.class);
    }

    // Extract the name from a JWT token
    public String extractName(String token) {
        return parseToken(token).get("name", String.class);
    }
}
