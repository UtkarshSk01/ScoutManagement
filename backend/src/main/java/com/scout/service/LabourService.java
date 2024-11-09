
package com.scout.service;

import com.scout.model.Labour;
import com.scout.repository.LabourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LabourService {
    
    @Autowired
    private LabourRepository labourRepository;

    public Labour saveLabour(Labour labour) {
        return labourRepository.save(labour);
    }

    public void deleteLabour(Long id) {
        labourRepository.deleteById(id);
    }
    public List<Labour> getAllLabours() {
        return labourRepository.findAll();
    }
 // In LabourService.java
    public Labour updateDetails(Labour labour) {
        return labourRepository.save(labour);
    }



    public Optional<Labour> getLabourById(Long id) {
        return labourRepository.findById(id);
    }

    public List<Labour> getLaboursBySalesManager(Long salesManagerId) {
        return labourRepository.findByAssignedSalesManagerId(salesManagerId);
    }

    public List<Labour> getLaboursByArea(String area) {
        return labourRepository.findByArea(area);
    }
}