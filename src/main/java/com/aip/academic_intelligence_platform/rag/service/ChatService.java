package com.aip.academic_intelligence_platform.rag.service;

import com.aip.academic_intelligence_platform.embedding.RetrievalService;
import com.aip.academic_intelligence_platform.embedding.dto.RetrivedChunk;
import com.aip.academic_intelligence_platform.rag.client.GeminiChatClient;
import com.aip.academic_intelligence_platform.rag.dto.ChatResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ChatService {
    private final RetrievalService retrievalService;
    private final PromptBuilder promptBuilder;
    private final GeminiChatClient chatClient;
    private final CitationService citationService;
    public ChatResponse askQuestion(String question){
        List<RetrivedChunk> chunks=retrievalService.retrieve(question);
        if(chunks.isEmpty()){
            return new ChatResponse("No relevant academic resource found.",List.of());
        }
        String prompt=promptBuilder.buildPrompt(question,chunks);
        String answer=chatClient.generateAnswer(prompt);
        return new ChatResponse(answer,citationService.buildCitations(chunks));
    }
}
