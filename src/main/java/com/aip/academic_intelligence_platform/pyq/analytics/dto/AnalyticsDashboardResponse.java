package com.aip.academic_intelligence_platform.pyq.analytics.dto;

import java.util.List;

public class AnalyticsDashboardResponse {
    private Long totalPapers;
    private Long totalQuestions;
    private List<TopicFrequencyResponse> topTopics;
    private List<MarksDistributionResponse> marksDistribution;
    private List<CourseOutcomeResponse> courseOutcomeDistribution;
    private List<PredictionResponse> predictedQuestions;
}
