package com.aip.academic_intelligence_platform.pyq;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "question_paper")
public class QuestionPaper {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String examType;
    private Integer year;
    private String subjectName;
    private String subjectCode;
    private String branch;
    private Integer totalMarks;
    @CreationTimestamp
    private LocalDateTime uploadedAt;
}
