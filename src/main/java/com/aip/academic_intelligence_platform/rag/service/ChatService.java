package com.aip.academic_intelligence_platform.rag.service;

import com.aip.academic_intelligence_platform.embedding.RetrievalService;
import com.aip.academic_intelligence_platform.embedding.dto.RetrivedChunk;
import com.aip.academic_intelligence_platform.exception.ResourceNotFoundException;
import com.aip.academic_intelligence_platform.rag.client.GeminiChatClient;
import com.aip.academic_intelligence_platform.rag.dto.ChatResponse;
import com.aip.academic_intelligence_platform.rag.memory.Conversation;
import com.aip.academic_intelligence_platform.rag.memory.MemoryService;
import com.aip.academic_intelligence_platform.user.User;
import com.aip.academic_intelligence_platform.user.UserRespository;
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
    private final UserRespository userRespository;
    private final MemoryService memoryService;
    public ChatResponse askQuestion(String question,String email){
        User student=userRespository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found"));

        List<RetrivedChunk> chunks=retrievalService.retrieve(question,student.getDepartment().getId());
        if(chunks.isEmpty()){
            return new ChatResponse("No relevant academic resource found.",List.of());
        }
        double bestSimilarity=chunks.get(0).similarity();
        if(bestSimilarity<0.65){
            return new ChatResponse("""
                    No revelant academic resource found for this question
                    """,List.of());
        }

        memoryService.addMessage(student.getId(),"USER",question);
        Conversation conversation=memoryService.getConversation(student.getId());
        String prompt=promptBuilder.buildPrompt(question,chunks,conversation);
        String answer=chatClient.generateAnswer(prompt);
        memoryService.addMessage(student.getId(),"ASSISTANT",answer);
        return new ChatResponse(answer,citationService.buildCitations(chunks));
    }
}
