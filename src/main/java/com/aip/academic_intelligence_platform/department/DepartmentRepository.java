package com.aip.academic_intelligence_platform.department;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department,String> {
    boolean existsByName(String name);
    Optional<Department> findByName(String name);
}
