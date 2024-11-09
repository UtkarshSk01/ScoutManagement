package com.scout.controller;

import com.scout.model.User;
import com.scout.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        User user = userService.findByUsername(username).orElse(null);
        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok("Login successful. Redirecting to: " + user.getRole().toString().toLowerCase() + "-dashboard.html");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
