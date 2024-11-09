package com.scout.controller;

import com.scout.model.Labour;
import com.scout.service.LabourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salesmanager")
public class SalesManagerController {

    @Autowired
    private LabourService labourService;

    // Add a Labour under Sales Manager
    @PostMapping("/labours")
    public ResponseEntity<Labour> addLabour(@RequestBody Labour labour) {
        return ResponseEntity.ok(labourService.saveLabour(labour));
    }

    // Get Labours by Area for the Sales Manager
    @GetMapping("/labours")
    public ResponseEntity<List<Labour>> getLaboursByArea(@RequestParam String area) {
        return ResponseEntity.ok(labourService.getLaboursByArea(area));
    }

    // Update Labour details assigned to the Sales Manager
    @PutMapping("/labours/{id}")
    public ResponseEntity<Labour> updateLabour(@PathVariable Long id, @RequestBody Labour labour) {
        Labour existingLabour = labourService.getLabourById(id).orElseThrow();
        existingLabour.updateDetails(labour);
        return ResponseEntity.ok(labourService.saveLabour(existingLabour));
    }
}
