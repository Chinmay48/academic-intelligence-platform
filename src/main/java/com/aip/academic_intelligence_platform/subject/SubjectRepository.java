package com.aip.academic_intelligence_platform.subject;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject,String> {
    List<Subject> findByDepartmentId(String departmentId);
    boolean existsByNameAndDepartmentId(String name,String departmnetId);
    long count();
    Optional<Subject> findByNameAndDepartmentId(String name, String departmentId);
}
