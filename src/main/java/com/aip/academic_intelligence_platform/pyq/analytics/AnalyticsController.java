package com.aip.academic_intelligence_platform.pyq.analytics;

import com.aip.academic_intelligence_platform.pyq.analytics.dto.AnalyticsDashboardResponse;
import com.aip.academic_intelligence_platform.pyq.analytics.dto.CourseOutcomeResponse;
import com.aip.academic_intelligence_platform.pyq.analytics.dto.PredictionResponse;
import com.aip.academic_intelligence_platform.pyq.analytics.dto.TopicFrequencyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
    private final AnalyticsService analyticsService;
    @GetMapping("/dashboard")
    public ResponseEntity<AnalyticsDashboardResponse> dashboard(@RequestParam String subject){
        return ResponseEntity.ok(analyticsService.getDashboard(subject));
    }
    @GetMapping("/topics")
    public ResponseEntity<List<TopicFrequencyResponse>> topics(@RequestParam String subject){
        return ResponseEntity.ok(analyticsService.getTopTopics(subject));
    }
    @GetMapping("/course-outcomes")
    public ResponseEntity<List<CourseOutcomeResponse>> courseOutcomes(@RequestParam String subject){
        return ResponseEntity.ok(analyticsService.getCourseOutcomeDistribution(subject));
    }
    @GetMapping("/predictions")
    public ResponseEntity<List<PredictionResponse>> predictions(@RequestParam String subject){
        return ResponseEntity.ok(analyticsService.getPredictions(subject));
    }
}
