package com.aip.academic_intelligence_platform.pyq;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamQuestionRepository extends JpaRepository<ExamQuestion,String> {
    List<ExamQuestion> findByQuestionPaperId(String questionPaperId);
}
