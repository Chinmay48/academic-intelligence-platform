package com.aip.academic_intelligence_platform.pyq.analytics;

import com.aip.academic_intelligence_platform.pyq.analytics.dto.TopicExtractListResponse;
import com.aip.academic_intelligence_platform.pyq.dto.ParsedQuestionDto;
import com.aip.academic_intelligence_platform.rag.client.GeminiChatClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicExtractionService {
    private final GeminiChatClient chatClient;
    private final ObjectMapper objectMapper;
    public TopicExtractListResponse extractTopics(List<ParsedQuestionDto> questions){
        String prompt=buildPrompt(questions);
        String response=chatClient.generateAnswer(prompt);
        try{
            return objectMapper.readValue(response, TopicExtractListResponse.class);
        }catch (Exception e){
          throw  new RuntimeException("Unable to parse topic response");
        }
    }

    private String buildPrompt(List<ParsedQuestionDto> questions) {

        StringBuilder builder = new StringBuilder();

        int id = 1;

        for (ParsedQuestionDto question : questions) {

            builder.append("QuestionId: Q")
                    .append(String.format("%03d", id))
                    .append("\n");

            builder.append("Section: ")
                    .append(question.getSection())
                    .append("\n");

            builder.append("Question Number: ")
                    .append(question.getQuestionNumber())
                    .append("\n");

            builder.append("Question:\n")
                    .append(question.getQuestionText())
                    .append("\n\n");

            builder.append("---------------------------------------------\n\n");

            id++;
        }

        return """
You are an engineering syllabus expert.

Your task is to identify the PRIMARY syllabus topic for every examination question.

Rules:

1. Return ONLY valid JSON.
2. Never skip any question.
3. Preserve the supplied QuestionId exactly.
4. Never change QuestionId.
5. Maximum FOUR words for a topic.
6. Use standard engineering syllabus terminology.
7. Do NOT explain.
8. Do NOT output Markdown.
9. If two questions belong to the same topic, return the same topic name.
10. Do not invent new terminology.
11. If multiple questions belong to the same syllabus concept, use exactly the same topic name.

Examples:

Pass-1 Assembler
Assembler Databases
Pass-2 Assembler

→ Assembler

Lexeme
Token
Pattern

→ Lexical Analysis

Loop Optimization
Machine Independent Optimization

→ Code Optimization

LL(1)
Predictive Parser

→ LL(1) Parsing

Return EXACTLY this schema:

{
  "topics":[
    {
      "questionId":"Q001",
      "topic":"Lexical Analysis"
    }
  ]
}

Questions:

%s
"""
                .formatted(builder.toString());
    }
}
