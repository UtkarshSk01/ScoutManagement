package com.scout.controller;

import com.scout.model.Attendance;
import com.scout.model.Salary;
import com.scout.service.AttendanceService;
import com.scout.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hr")
public class HRController {

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private SalaryService salaryService;

    @GetMapping("/attendance")
    public ResponseEntity<List<Attendance>> getAttendance() {
        return ResponseEntity.ok(attendanceService.getAllAttendance());
    }

    @PostMapping("/attendance")
    public ResponseEntity<Attendance> logAttendance(@RequestBody Attendance attendance) {
        return ResponseEntity.ok(attendanceService.saveAttendance(attendance));
    }

    @GetMapping("/salaries")
    public ResponseEntity<List<Salary>> getSalaries() {
        return ResponseEntity.ok(salaryService.getAllSalaries());
    }

    @PostMapping("/salaries")
    public ResponseEntity<Salary> addSalary(@RequestBody Salary salary) {
        return ResponseEntity.ok(salaryService.saveSalary(salary));
    }
}
