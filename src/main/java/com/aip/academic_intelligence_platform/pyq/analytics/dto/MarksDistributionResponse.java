package com.aip.academic_intelligence_platform.pyq.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MarksDistributionResponse {
    private Integer marks;
    private Long count;
}
