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


        // 3. Get PREVIOUS conversation history

List<Message> history =
        memoryService.getRecentMessages(
                conversation.getId()
        );



System.out.println("\n========== HISTORY FROM DATABASE ==========");

for (int i = 0; i < history.size(); i++) {
    Message m = history.get(i);

    System.out.println(
            i + " | " +
            m.getCreatedAt() + " | " +
            m.getRole() + " | " +
            m.getContent()
    );
}

System.out.println("============================================\n");
String effectiveQuestion =
        quereyRewriteService.rewriteQuestion(
                question,
                history
        );

System.out.println(
        "Original Question: " + question
);

System.out.println(
        "Effective Question: " + effectiveQuestion
);


// 5. Retrieve using standalone question

List<RetrivedChunk> chunks =
        retrievalService.retrieve(
                effectiveQuestion,
                student.getDepartment().getId()
        );


// 6. Save ORIGINAL user message

memoryService.addMessage(
        conversation,
        "USER",
        question
);


// 7. No chunks

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


// 8. Similarity

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


// 9. Build prompt using RESOLVED question

String prompt =
        promptBuilder.buildPrompt(
                effectiveQuestion,
                chunks,
                history
        );


// 10. Generate

String answer =
        chatClient.generateAnswer(prompt);


// 11. Save answer

memoryService.addMessage(
        conversation,
        "ASSISTANT",
        answer
);


// 12. Response

return new ChatResponse(
        answer,
        citationService.buildCitations(chunks),
        conversation.getId()
);
    }
}