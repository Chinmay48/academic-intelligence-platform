package com.aip.academic_intelligence_platform.pyq.parser;

import com.aip.academic_intelligence_platform.pyq.dto.ParsedQuestionPaperDto;

import com.aip.academic_intelligence_platform.rag.client.GeminiChatClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeminiQuestionExtractor {

    private final GeminiChatClient chatClient;

    private final ObjectMapper objectMapper;

    public ParsedQuestionPaperDto extractQuestionPaper(
            String extractedText
    ) {

        String prompt =
                buildPrompt(extractedText);

        String response =
                chatClient.generateAnswer(prompt);

        try {

            return objectMapper.readValue(
                    response,
                    ParsedQuestionPaperDto.class
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse question paper JSON: "
                            + response,
                    e
            );
        }
    }

    private String buildPrompt(
            String paperText
    ) {

        return """
You are an academic question paper parser.

Convert the following question paper into JSON.

Return ONLY valid JSON.

Schema:

{
  "examType":"",
  "year":0,
  "branch":"",
  "subjectName":"",
  "subjectCode":"",
  "totalMarks":0,
  "questions":[
    {
      "section":"",
      "questionNumber":0,
      "marks":0,
      "courseOutcome":0,
      "questionText":""
    }
  ]
}

Rules:

1. Extract branch.
2. Extract subject name.
3. Extract subject code.
4. Extract exam type.
5. Extract year.
6. Extract total marks.
7. Extract every question.
8. Preserve question text exactly.
9. Extract section:
   - Section-I
   - Section-II
   - Section-III
10. Extract marks.
11. Extract CO number.
12. Return JSON only.
13. Do not include markdown.
14. Do not include explanation.

Question Paper:

%s
"""
                .formatted(paperText);
    }
}