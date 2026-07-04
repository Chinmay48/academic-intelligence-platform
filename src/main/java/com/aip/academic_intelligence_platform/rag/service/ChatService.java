package com.aip.academic_intelligence_platform.rag.service;

import com.aip.academic_intelligence_platform.embedding.RetrievalService;
import com.aip.academic_intelligence_platform.embedding.dto.RetrivedChunk;
import com.aip.academic_intelligence_platform.exception.ResourceNotFoundException;
import com.aip.academic_intelligence_platform.rag.client.GeminiChatClient;
import com.aip.academic_intelligence_platform.rag.dto.ChatResponse;
import com.aip.academic_intelligence_platform.rag.memory.Conversation;
import com.aip.academic_intelligence_platform.rag.memory.MemoryService;
import com.aip.academic_intelligence_platform.rag.memory.Message;
import com.aip.academic_intelligence_platform.rag.rewrite.QuereyRewriteService;
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

    private final QuereyRewriteService quereyRewriteService;


    public ChatResponse askQuestion(
            String question,
            String email,
            String conversationId
    ) {

        // 1. Get logged-in student

        User student = userRespository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );


        // 2. Create new conversation OR load existing one

        Conversation conversation;

        if (conversationId == null || conversationId.isBlank()) {

            conversation = memoryService
                    .createConversation(
                            student,
                            question
                    );

        } else {

            conversation = memoryService
                    .getConversation(
                            conversationId,
                            student
                    );
        }


        // 3. Get previous messages of THIS conversation

        List<Message> history =
                memoryService.getRecentMessages(
                        conversation.getId()
                );


        // 4. Rewrite follow-up question using conversation history

        String effectiveQuestion =
                quereyRewriteService.rewriteQuestion(
                        question,
                        history
                );


        // 5. Retrieve relevant chunks

        List<RetrivedChunk> chunks =
                retrievalService.retrieve(
                        effectiveQuestion,
                        student.getDepartment().getId()
                );


        // 6. Save user message

        memoryService.addMessage(
                conversation,
                "USER",
                question
        );


        // 7. No chunks found

        if (chunks.isEmpty()) {

            String answer =
                    "No relevant academic resource found.";

            memoryService.addMessage(
                    conversation,
                    "ASSISTANT",
                    answer
            );

            return new ChatResponse(
                    answer,
                    List.of(),
                    conversation.getId()
            );
        }


        // 8. Similarity validation

        double bestSimilarity =
                chunks.get(0).similarity();


        if (bestSimilarity < 0.65) {

            String answer =
                    "No relevant academic resource found for this question.";

            memoryService.addMessage(
                    conversation,
                    "ASSISTANT",
                    answer
            );

            return new ChatResponse(
                    answer,
                    List.of(),
                    conversation.getId()
            );
        }


        // 9. Get updated history including current user question

        List<Message> updatedHistory =
                memoryService.getRecentMessages(
                        conversation.getId()
                );


        // 10. Build RAG prompt

        String prompt =
                promptBuilder.buildPrompt(
                        question,
                        chunks,
                        updatedHistory
                );


        // 11. Generate answer

        String answer =
                chatClient.generateAnswer(prompt);


        // 12. Save assistant answer

        memoryService.addMessage(
                conversation,
                "ASSISTANT",
                answer
        );


        // 13. Return response

        return new ChatResponse(
                answer,
                citationService.buildCitations(chunks),
                conversation.getId()
        );
    }
}