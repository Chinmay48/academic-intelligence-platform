package com.aip.academic_intelligence_platform.pyq.dto;

import lombok.Data;

import java.util.List;

@Data
public class ParsedQuestionPaperDto {
    private String examType;
    private Integer year;
    private String branch;
    private String subjectName;
    private String subjectCode;
    private Integer totalMarks;
    private List<ParsedQuestionDto> questions;
}
