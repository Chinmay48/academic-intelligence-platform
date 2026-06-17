package com.aip.academic_intelligence_platform.subject;


import com.aip.academic_intelligence_platform.department.Department;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "subjects")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false)
    private String name;
    @ManyToOne
    @JoinColumn(name="department_id")
    private Department department;
}
