package com.scout.repository;

import com.scout.model.Labour;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LabourRepository extends JpaRepository<Labour, Long> {
    List<Labour> findByAssignedSalesManagerId(Long salesManagerId);
    List<Labour> findByArea(String area);
}
