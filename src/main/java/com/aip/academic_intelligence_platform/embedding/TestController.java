package com.aip.academic_intelligence_platform.embedding;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import java.util.List;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {
    @Value("${gemini.api.key}")
    private String apiKey;
    private final EmbeddingService embeddingService;
    private final RestClient restClient;
    @GetMapping("/embedding")
    public List<Double> testEmbedding(@RequestParam String text){
        return embeddingService.generateEmbedding(text);
    }

    @GetMapping("/models")
    public String models(){
        return restClient.get().uri("https://generativelanguage.googleapis.com/v1beta/models?key="
                + apiKey).retrieve().body(String.class);
    }
}
