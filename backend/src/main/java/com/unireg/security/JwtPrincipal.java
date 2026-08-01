package com.unireg.security;

import java.io.Serializable;

public class JwtPrincipal implements Serializable {
    private final Long userId;
    private final String email;
    private final String role;

    public JwtPrincipal(Long userId, String email, String role) {
        this.userId = userId;
        this.email = email;
        this.role = role;
    }

    public Long getUserId() { return userId; }
    public String getEmail() { return email; }
    public String getRole() { return role; }

    public String getName() {
        return email;
    }
}
