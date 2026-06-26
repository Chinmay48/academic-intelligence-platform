package com.aip.academic_intelligence_platform.pyq.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExamQuestionResponse {
    private String id;
    private String section;
    private Integer questionNumber;
    private Integer marks;
    private Integer courseOutcomes;
    private String topic;
    private String questionText;
}
