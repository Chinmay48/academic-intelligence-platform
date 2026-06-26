package com.aip.academic_intelligence_platform.pyq.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuestionPaperResponse {
    private String id;
    private String subjectName;
    private String branch;
    private String subjectCode;
    private Integer year;
    private String examType;
    private Integer totalMarks;
}
