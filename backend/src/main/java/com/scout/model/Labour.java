
package com.scout.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Labour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Long assignedSalesManagerId;
    private String area; // e.g., Noida, Delhi, Greater Noida
    private String tasks; // Details or description of tasks assigned

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getAssignedSalesManagerId() {
        return assignedSalesManagerId;
    }

    public void setAssignedSalesManagerId(Long assignedSalesManagerId) {
        this.assignedSalesManagerId = assignedSalesManagerId;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getTasks() {
        return tasks;
    }

    public void setTasks(String tasks) {
        this.tasks = tasks;
    }



	public void updateDetails(Labour labour) {
		// TODO Auto-generated method stub
		
	}
}