package com.scout.service;

import com.scout.model.Salary;
import com.scout.repository.SalaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SalaryService {
    
    @Autowired
    private SalaryRepository salaryRepository;

    public Salary saveSalary(Salary salary) {
        return salaryRepository.save(salary);
    }

    public void deleteSalary(Long id) {
        salaryRepository.deleteById(id);
    }

    public Optional<Salary> getSalaryById(Long id) {
        return salaryRepository.findById(id);
    }
 // In SalaryService.java
    public List<Salary> getAllSalaries() {
        return salaryRepository.findAll();
    }


    public List<Salary> getSalariesByEmployeeId(Long employeeId) {
        return salaryRepository.findByEmployeeId(employeeId);
    }
}
