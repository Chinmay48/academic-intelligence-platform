package com.aip.academic_intelligence_platform.rag.service;

import com.aip.academic_intelligence_platform.embedding.dto.RetrivedChunk;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromptBuilder {
    public String buildPrompt(String question, List<RetrivedChunk> chunks){
        StringBuilder context=new StringBuilder();
        for(RetrivedChunk chunk:chunks){
            context.append(chunk.chunkText()).append("\n\n");
        }
        return """
                 You are an engineering academic assistant.
                
                                Answer ONLY from the provided context.
                
                                If answer is not present,
                                reply:
                                "No relevant academic resource found."
                
                                Context:
                                %s
                
                                Question:
                                %s
                """.formatted(context,question);
    }
}
