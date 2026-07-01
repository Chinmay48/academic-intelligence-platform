package com.aip.academic_intelligence_platform.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminDashboardResponse {
    private Long students;
    private Long faculty;
    private Long departments;
    private Long subjects;
    private Long documents;
    private Long questionPapers;
}
