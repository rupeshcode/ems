package com.ems.managementsystem.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.managementsystem.models.AddEmployee;
import com.ems.managementsystem.repositories.EmployeeRepo;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    EmployeeRepo employeeRepo;

    @Transactional
    @PostMapping("/add")
    public String add(@RequestBody AddEmployee body) throws Exception {
        // Property body = req.bodyAs(Property.class);
        try {
            employeeRepo.save(body);
            return ("added");
        } catch (Exception e) {
            throw new Exception("Something went wrong");
        }

    }

    @PostMapping("/add")
    public EncryptedResponse add(@RequestBody EncryptedRequest req) throws Exception {
        AddEmployee body = req.bodyAs(AddEmployee.class);
        try {
            employeeRepo.save(body);
            return new EncryptedResponse("added");
        } catch (Exception e) {
            throw new Exception("Something went wrong");
        }

    }

}
