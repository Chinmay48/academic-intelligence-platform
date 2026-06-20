package com.aip.academic_intelligence_platform.embedding;

import com.aip.academic_intelligence_platform.embedding.dto.EmbeddingRequest;
import com.aip.academic_intelligence_platform.embedding.dto.EmbeddingResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GeminiEmbeddingService implements EmbeddingService{
    private final RestClient restClient;
    @Value("${gemini.api.key}")
    private String apiKey;
    @Value("${gemini.embedding.url}")
    private String embeddingUrl;


    @Override
    public List<Double> generateEmbedding(String text){
        EmbeddingRequest request=new EmbeddingRequest(new EmbeddingRequest.Content(List.of(new EmbeddingRequest.Part(text))));
        EmbeddingResponse response=restClient.post().uri(embeddingUrl+"?key="+apiKey).body(request).retrieve().body(EmbeddingResponse.class);
        return response.getEmbedding().getValues();
    }
}
