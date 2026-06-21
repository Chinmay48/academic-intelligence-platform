package com.aip.academic_intelligence_platform.rag.service;

import com.aip.academic_intelligence_platform.embedding.dto.RetrivedChunk;
import com.aip.academic_intelligence_platform.rag.memory.Conversation;
import com.aip.academic_intelligence_platform.rag.memory.MemoryService;
import com.aip.academic_intelligence_platform.rag.memory.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PromptBuilder {
    private  final MemoryService memoryService;
    public String buildPrompt(String question, List<RetrivedChunk> chunks, List<Message> recentMessages){
        StringBuilder context=new StringBuilder();
        StringBuilder chatHistory=new StringBuilder();

        for(Message message:recentMessages){
            chatHistory.append(message.getRole());
            chatHistory.append(": ");
            chatHistory.append(message.getContent());
            chatHistory.append("\n");
        }
        for(RetrivedChunk chunk:chunks){
            context.append(chunk.chunkText()).append("\n\n");
        }
        return """
You are Academic Intelligence Platform (AIP),
an AI academic assistant for engineering students.

ROLE:
- Answer academic questions using ONLY the provided context.
- The context comes from faculty-approved study material.
- Never use external knowledge.
- If the context does not contain enough information,
  do not attempt to complete the answer from your own knowledge.
- Never invent facts.
- Never guess.

MEMORY:
Previous conversation:

%s

CONTEXT:
%s

QUESTION:
%s

ANSWERING RULES:

1. If the answer is clearly present in the context:
   - Provide a detailed technical explanation.
   - Use engineering terminology.
   - Structure the answer using headings,
     bullet points and examples where useful.

2. If the user asks for exam preparation:
   - Write answers in university exam style.
   - Include definitions, explanations,
     diagrams (if applicable), advantages,
     disadvantages and applications.

3. If the answer is partially available:
   - Answer only the available portion.
   - Clearly state what information is missing.

4. If the answer is not available:
   Respond EXACTLY with:

   No relevant academic resource found.

5. Do not mention:
   - Gemini
   - AI model
   - Retrieval system
   - Context documents

6. Keep answers technically accurate
   and educational.

FINAL ANSWER:
"""
                .formatted(
                        chatHistory,
                        context,
                        question
                );
    }
}
