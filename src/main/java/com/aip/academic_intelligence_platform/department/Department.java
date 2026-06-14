package com.aip.academic_intelligence_platform.department;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "departments")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String  id;
    @Column(nullable = false,unique = true)
    private String name;
}
