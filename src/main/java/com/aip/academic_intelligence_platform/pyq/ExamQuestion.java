package com.aip.academic_intelligence_platform.pyq;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "exam_question")
public class ExamQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JoinColumn(name="question_paper_id")
    private QuestionPaper questionPaper;
    private Integer questionNumber;
    private Integer marks;
    private Integer courseOutcome;
    @Column(columnDefinition = "TEXT")
    private String topic;
    @Column(columnDefinition = "TEXT")
    private String questionText;
}
