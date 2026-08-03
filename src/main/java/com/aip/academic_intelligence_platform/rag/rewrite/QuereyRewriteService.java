package com.aip.academic_intelligence_platform.rag.rewrite;


import com.aip.academic_intelligence_platform.rag.client.GeminiChatClient;
import com.aip.academic_intelligence_platform.rag.memory.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuereyRewriteService {
    private final GeminiChatClient chatClient;
    public String rewriteQuestion(
        String currentQuestion,
        List<Message> history
) {

    if (history == null || history.isEmpty()) {
        return currentQuestion;
    }

    // Only recent messages are relevant for resolving
    // references such as "it", "this", "that", etc.
    int start = Math.max(
            0,
            history.size() - 4
    );

    List<Message> recentHistory =
            history.subList(
                    start,
                    history.size()
            );
System.out.println("\n========= REWRITE HISTORY =========");

recentHistory.forEach(message -> {

    System.out.println(
            message.getCreatedAt()
            + " | "
            + message.getRole()
            + " | "
            + message.getContent()
    );
});

System.out.println("===================================\n");
    StringBuilder conversation =
            new StringBuilder();

    recentHistory.forEach(message -> {

        conversation
                .append(message.getRole())
                .append(": ")
                .append(message.getContent())
                .append("\n");
    });

    String prompt = """
You are a query rewriting assistant for a RAG system.

Your ONLY task is to convert a context-dependent question
into a standalone question.

RULES:

1. If the current question is already complete and self-contained,
   return it EXACTLY as it is.

2. If the current question contains references such as:
   "it", "its", "this", "that", "they", "them",
   resolve the reference using the MOST RECENT relevant topic.

3. Conversation history is chronological.
   The messages at the BOTTOM are the MOST RECENT.

4. Always prefer the most recent user topic when resolving
   ambiguous references.

5. Ignore older unrelated topics.

6. Do NOT answer the question.

7. Do NOT explain anything.

8. Return ONLY the rewritten question.

Example:

Conversation History:

USER: What is Software Configuration Management?
ASSISTANT: Software Configuration Management is...

USER: What is Formal Technical Review?
ASSISTANT: Formal Technical Review is...

Current Question:
What are the benefits of it?

Output:
What are the benefits of Formal Technical Review?

Conversation History:

%s

Current Question:

%s

Output:
""".formatted(
            conversation,
            currentQuestion
    );

    String rewrittenQuestion =
            chatClient.generateAnswer(prompt);

    return rewrittenQuestion
            .replace("\"", "")
            .trim();
}

}
