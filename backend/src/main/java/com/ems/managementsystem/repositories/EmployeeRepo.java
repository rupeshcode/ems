package com.ems.managementsystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.managementsystem.models.AddEmployee;

public interface EmployeeRepo extends JpaRepository<AddEmployee, Long> {

}
