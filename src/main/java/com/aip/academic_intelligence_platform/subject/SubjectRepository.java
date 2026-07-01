package com.aip.academic_intelligence_platform.subject;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject,String> {
    List<Subject> findByDepartmentId(String departmentId);
    boolean existsByNameAndDepartmentId(String name,String departmnetId);
    long count();
}
