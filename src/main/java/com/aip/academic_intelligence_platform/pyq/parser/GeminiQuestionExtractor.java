package com.aip.academic_intelligence_platform.pyq.parser;

import com.aip.academic_intelligence_platform.pyq.dto.ParsedQuestionPaperDto;
import com.aip.academic_intelligence_platform.rag.client.GeminiChatClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class GeminiQuestionExtractor {
    private final GeminiChatClient chatClient;
    private final ObjectMapper objectMapper;
    public ParsedQuestionPaperDto extractQuestions(String paperText){
        String prompt=buildPrompt(paperText);
        String response=chatClient.generateAnswer(prompt);
        try{
            return objectMapper.readValue(response, ParsedQuestionPaperDto.class);
        }catch (Exception e){
            throw  new RuntimeException("Failed to parse question paper JSON");
        }
    }
    private String buildPrompt(String paperText){
        return """
                Extract the question paper information.
                
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
                      "questionNumber":0,
                      "marks":0,
                      "courseOutcome":0,
                      "questionText":""
                    }
                  ]
                }
                
                Rules:
                
                1. Extract branch.
                2. Extract subject.
                3. Extract subject code.
                4. Extract exam type.
                5. Extract year.
                6. Extract total marks.
                7. Extract every question.
                8. Do not summarize questions.
                9. Preserve question text exactly.
                10. Return JSON only.
                
                Question Paper:
                
                %s
                ""\"
                """.formatted(paperText);
    }
}
