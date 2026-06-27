package com.aip.academic_intelligence_platform.pyq.analytics;


import com.aip.academic_intelligence_platform.pyq.ExamQuestion;
import com.aip.academic_intelligence_platform.pyq.ExamQuestionRepository;
import com.aip.academic_intelligence_platform.pyq.analytics.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsService {
     private final ExamQuestionRepository examQuestionRepository;
     private final PredictionService predictionService;
     public AnalyticsDashboardResponse getDashboard(String subjectName){
         return new AnalyticsDashboardResponse(examQuestionRepository.countDistinctQuestionPapers(subjectName),examQuestionRepository.countQuestions(subjectName),getTopTopics(subjectName),getMarksDistribution(subjectName),getCourseOutcomeDistribution(subjectName),getPredictions(subjectName));
     }

     public List<TopicFrequencyResponse> getTopTopics(String subjectName){
         return examQuestionRepository.getTopicFrequency(subjectName).stream().map(result->new TopicFrequencyResponse((String)result[0],(Long)result[1])).toList();
     }

     public List<MarksDistributionResponse> getMarksDistribution(String subjectName){
         return examQuestionRepository.getMarksDistribution(subjectName).stream().map(result->new MarksDistributionResponse((Integer) result[0],(Long)result[1])).toList();
     }
    public List<CourseOutcomeResponse> getCourseOutcomeDistribution(
            String subjectName
    ) {

        return examQuestionRepository
                .getCourseOutcomeDistribution(subjectName)
                .stream()
                .map(result ->
                        new CourseOutcomeResponse(

                                (Integer) result[0],

                                ((Long) result[1])

                        )
                )
                .toList();
    }
    public List<PredictionResponse> getPredictions(
            String subjectName
    ){

        List<ExamQuestion> questions =
                examQuestionRepository
                        .findByQuestionPaperSubjectName(
                                subjectName
                        );

        return predictionService.predict(
                questions
        );
    }
}
