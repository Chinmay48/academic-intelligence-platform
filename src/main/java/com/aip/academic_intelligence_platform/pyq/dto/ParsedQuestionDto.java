package com.aip.academic_intelligence_platform.pyq.dto;


import lombok.Data;

@Data
public class ParsedQuestionDto {
    private Integer questionNumber;
    private Integer marks;
    private Integer courseOutcome;
    private String questionText;
}
