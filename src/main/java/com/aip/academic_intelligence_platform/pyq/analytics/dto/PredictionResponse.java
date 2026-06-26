package com.aip.academic_intelligence_platform.pyq.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PredictionResponse {
    private String topic;
    private Double confidence;
    private Integer frequency;
}
