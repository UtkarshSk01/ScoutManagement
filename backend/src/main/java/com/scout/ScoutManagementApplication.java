package com.scout;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.scout.model"})  // Ensure model entities are scanned
@ComponentScan(basePackages = {"com.scout", "com.scout.repository", "com.scout.service", "com.scout.config", "com.scout.controller"})  // Include necessary packages
public class ScoutManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(ScoutManagementApplication.class, args);
    }
}
