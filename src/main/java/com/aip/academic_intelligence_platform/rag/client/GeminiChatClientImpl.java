package com.aip.academic_intelligence_platform.rag.client;

import com.aip.academic_intelligence_platform.rag.dto.ChatGenerationRequest;
import com.aip.academic_intelligence_platform.rag.dto.ChatGenerationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GeminiChatClientImpl implements GeminiChatClient{
    private final RestClient restClient;
    @Value("${gemini.api.key}")
    private String apiKey;
    @Value("${gemini.char.url}")
    private String chatUrl;
    @Override
    public String generateAnswer(String prompt){
        ChatGenerationRequest request=new ChatGenerationRequest(List.of(new ChatGenerationRequest.Content(List.of(new ChatGenerationRequest.Part(prompt)))));
        ChatGenerationResponse response=restClient.post().uri(chatUrl+"?key="+apiKey).body(request).retrieve().body(ChatGenerationResponse.class);
        if(response==null || response.getCandidates()==null || response.getCandidates().isEmpty()){
            throw new RuntimeException("No response from Gemini");
        }
        return  response.getCandidates()
                .get(0)
                .getContent()
                .getParts()
                .get(0)
                .getText();
    }
}
