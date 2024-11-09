package com.scout.controller;

import com.scout.model.Attendance;
import com.scout.model.Task;
import com.scout.service.AttendanceService;
import com.scout.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/labour")
public class LabourController {

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private TaskService taskService;

    // Log Task for a Labour
    @PostMapping("/tasks")
    public ResponseEntity<Task> logTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.saveTask(task));
    }

    // Get all Tasks assigned to the Labour
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    // Log Attendance for a Labour
    @PostMapping("/attendance")
    public ResponseEntity<Attendance> logAttendance(@RequestBody Attendance attendance) {
        return ResponseEntity.ok(attendanceService.saveAttendance(attendance));
    }
}
