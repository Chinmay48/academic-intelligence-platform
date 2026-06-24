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
    public String rewriteQuestion(String currentQuestion, List<Message> history){
        if(history==null || history.isEmpty()){
            return currentQuestion;
        }
        StringBuilder conversation=new StringBuilder();
        history.forEach(message -> {
            conversation.append(message.getRole());
            conversation.append(": ");
            conversation.append(message.getContent());
            conversation.append("\n");
        });
        String prompt="""
You are a query rewriting assistant for a RAG system.

Your job is to determine whether the current question depends on previous conversation context.

RULES:

1. If the current question is already complete and self-contained:
   Return it EXACTLY as it is.

2. If the current question depends on previous conversation:
   Rewrite it into a complete standalone question.

3. Do not answer the question.

4. Do not explain your reasoning.

5. Return ONLY the final question.

Examples:

Previous Conversation:
USER: What is Linear Regression?

Current Question:
What are its assumptions?

Output:
What are the assumptions of Linear Regression?

-------------------------

Previous Conversation:
USER: What is DBMS?

Current Question:
Explain normalization.

Output:
Explain normalization.

-------------------------

Conversation History:

%s

Current Question:

%s
""".formatted(conversation,currentQuestion);
        String rewrittenQuestion=chatClient.generateAnswer(prompt);
        return rewrittenQuestion.replace("\"","").trim();

    }

}
