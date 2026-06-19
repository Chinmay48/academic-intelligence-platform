package com.aip.academic_intelligence_platform.embedding;

import org.springframework.stereotype.Component;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;


import java.util.List;

@Component
public class EmbeddingParser {
    private final ObjectMapper objectMapper=new ObjectMapper();
    public String toJson(List<Double> embedding){
        try{
            return objectMapper.writeValueAsString(embedding);
        }catch (Exception ex){
            throw new RuntimeException(ex);
        }
    }

    public List<Double> fromJson(String json){
        try {
            return objectMapper.readValue(json, new TypeReference<List<Double>>() {});

        }
        catch (Exception ex){
            throw new RuntimeException(ex);
        }
    }
}
