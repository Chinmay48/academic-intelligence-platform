package com.aip.academic_intelligence_platform.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentDashboardResponse {
    private Long documents;
    private Long subjects;
    private Long questionPapers;
    private String department;
}
