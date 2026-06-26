package com.aip.academic_intelligence_platform.pyq.analytics.dto;

import lombok.Data;

import java.util.List;

@Data
public class TopicExtractListResponse {
    private List<TopicExtractionResponse> topics;
}
