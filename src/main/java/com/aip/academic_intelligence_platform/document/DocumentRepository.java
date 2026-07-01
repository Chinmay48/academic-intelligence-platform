package com.aip.academic_intelligence_platform.document;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document,String> {
    List<Document> findBySubjectId(String subjectId);
    long count();
    long countByUploadedById(String facultyId);
}
