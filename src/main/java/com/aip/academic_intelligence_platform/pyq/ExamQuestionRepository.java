package com.aip.academic_intelligence_platform.pyq;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExamQuestionRepository extends JpaRepository<ExamQuestion,String> {
    List<ExamQuestion> findByQuestionPaperId(String questionPaperId);
    List<ExamQuestion> findByQuestionPaperSubjectName(String subjectName);
    @Query("""
SELECT q.topic,
COUNT(q)
FROM ExamQuestion q
WHERE q.questionPaper.subjectName = :subject
GROUP BY q.topic
ORDER BY COUNT(q) DESC
""")
    List<Object[]> getTopicFrequency(
            @Param("subject")
            String subject
    );
    @Query("""
SELECT q.marks,
COUNT(q)
FROM ExamQuestion q
WHERE q.questionPaper.subjectName = :subject
GROUP BY q.marks
ORDER BY q.marks
""")
    List<Object[]> getMarksDistribution(
            @Param("subject")
            String subject
    );
    @Query("""
SELECT q.courseOutcome,
COUNT(q)
FROM ExamQuestion q
WHERE q.questionPaper.subjectName = :subject
GROUP BY q.courseOutcome
ORDER BY q.courseOutcome
""")
    List<Object[]> getCourseOutcomeDistribution(
            @Param("subject")
            String subject
    );
    @Query("""
SELECT COUNT(DISTINCT q.questionPaper.id)
FROM ExamQuestion q
WHERE q.questionPaper.subjectName = :subject
""")
    Long countDistinctQuestionPapers(
            @Param("subject")
            String subject
    );
    @Query("""
SELECT COUNT(q)
FROM ExamQuestion q
WHERE q.questionPaper.subjectName = :subject
""")
    Long countQuestions(
            @Param("subject")
            String subject
    );


}
