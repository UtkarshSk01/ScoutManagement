package com.scout.controller;

import com.scout.model.User;
import com.scout.model.Labour;
import com.scout.service.UserService;
import com.scout.service.LabourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private LabourService labourService;

    // Add Sales Manager
    @PostMapping("/salesmanagers")
    public ResponseEntity<User> addSalesManager(@RequestBody User salesManager) {
        // Ensure Sales Manager has the correct role
        salesManager.setRole(User.Role.SALES_MANAGER); // Use User.Role enum
        return ResponseEntity.ok(userService.saveUser(salesManager));
    }

    // Get all Sales Managers
    @GetMapping("/salesmanagers")
    public ResponseEntity<List<User>> getSalesManagers() {
        return ResponseEntity.ok(userService.findByRole(User.Role.SALES_MANAGER)); // Use User.Role enum
    }

    // Add Labour
    @PostMapping("/labours")
    public ResponseEntity<Labour> addLabour(@RequestBody Labour labour) {
        return ResponseEntity.ok(labourService.saveLabour(labour));
    }

    // Get all Labours
    @GetMapping("/labours")
    public ResponseEntity<List<Labour>> getLabours() {
        return ResponseEntity.ok(labourService.getAllLabours());
    }
}