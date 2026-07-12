package com.project.course_registration.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    public Admin() {
    }

    public Admin(Integer id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String adminName) {
        this.name = adminName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String adminEmail) {
        this.email = adminEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String adminPassword) {
        this.password = adminPassword;
    }
}