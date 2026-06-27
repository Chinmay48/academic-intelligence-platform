package com.aip.academic_intelligence_platform.pyq.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AnalyticsDashboardResponse {
    private Long totalPapers;
    private Long totalQuestions;
    private List<TopicFrequencyResponse> topTopics;
    private List<MarksDistributionResponse> marksDistribution;
    private List<CourseOutcomeResponse> courseOutcomeDistribution;
    private List<PredictionResponse> predictedQuestions;
}
