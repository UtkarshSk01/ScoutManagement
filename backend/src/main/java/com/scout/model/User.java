package com.scout.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // Enum for roles (Admin, Sales Manager, Labour, HR)

    private String area; // For Sales Managers (e.g., Noida, Delhi, Greater Noida)
    private Boolean isTrackingEnabled; // For location tracking of labours/sales managers

    // Getter and Setter methods

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Boolean getIsTrackingEnabled() {
        return isTrackingEnabled;
    }

    public void setIsTrackingEnabled(Boolean isTrackingEnabled) {
        this.isTrackingEnabled = isTrackingEnabled;
    }

    // Role enum for user roles
    public enum Role {
        ADMIN,
        SALES_MANAGER,
        LABOUR,
        HR
    }
}