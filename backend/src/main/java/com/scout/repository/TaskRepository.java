package com.scout.repository;

import com.scout.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // You can add more custom queries here if needed
}
