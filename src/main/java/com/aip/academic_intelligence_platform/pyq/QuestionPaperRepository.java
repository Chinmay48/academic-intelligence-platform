package com.aip.academic_intelligence_platform.pyq;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionPaperRepository extends JpaRepository<QuestionPaper,String> {
    long count();
}
