package com.aip.academic_intelligence_platform.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FacultyDashboardResponse {
    private Long uploadedDocuments;
    private Long uploadedPYQs;
    private Long subjects;
}
