package com.aip.academic_intelligence_platform.pyq.analytics;

import com.aip.academic_intelligence_platform.pyq.ExamQuestion;
import com.aip.academic_intelligence_platform.pyq.analytics.dto.PredictionResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PredictionService {

    private static final double FREQUENCY_WEIGHT = 0.5;
    private static final double MARKS_WEIGHT = 0.3;
    private static final double RECENCY_WEIGHT = 0.2;

    public List<PredictionResponse> predict(
            List<ExamQuestion> questions
    ) {

        if (questions.isEmpty()) {
            return List.of();
        }

        int latestYear = questions.stream()
                .map(q -> q.getQuestionPaper().getYear())
                .max(Integer::compareTo)
                .orElse(0);

        Map<String, List<ExamQuestion>> grouped =
                questions.stream()
                        .collect(Collectors.groupingBy(
                                ExamQuestion::getTopic
                        ));

        int maxFrequency = grouped.values()
                .stream()
                .mapToInt(List::size)
                .max()
                .orElse(1);

        List<PredictionResponse> predictions =
                new ArrayList<>();

        for (var entry : grouped.entrySet()) {

            String topic = entry.getKey();

            List<ExamQuestion> topicQuestions =
                    entry.getValue();

            int frequency = topicQuestions.size();

            double averageMarks =
                    topicQuestions.stream()
                            .mapToInt(ExamQuestion::getMarks)
                            .average()
                            .orElse(0);

            int mostRecentYear =
                    topicQuestions.stream()
                            .map(q -> q.getQuestionPaper().getYear())
                            .max(Integer::compareTo)
                            .orElse(0);

            // Normalize every metric
            double normalizedFrequency =
                    (double) frequency / maxFrequency;

            double normalizedMarks =
                    averageMarks / 10.0;

            double normalizedRecency =
                    latestYear == 0
                            ? 0
                            : (double) mostRecentYear / latestYear;

            double score =

                    normalizedFrequency * FREQUENCY_WEIGHT

                            +

                            normalizedMarks * MARKS_WEIGHT

                            +

                            normalizedRecency * RECENCY_WEIGHT;

            // Convert to percentage
            double confidence =
                    Math.round(score * 10000.0) / 100.0;

            predictions.add(

                    new PredictionResponse(

                            topic,

                            frequency,

                            mostRecentYear,

                            confidence

                    )
            );
        }

        predictions.sort(
                Comparator.comparing(
                        PredictionResponse::getConfidence
                ).reversed()
        );

        return predictions;
    }
}
