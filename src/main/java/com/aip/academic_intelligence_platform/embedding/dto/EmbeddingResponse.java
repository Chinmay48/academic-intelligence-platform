package com.aip.academic_intelligence_platform.embedding.dto;

import lombok.Data;

import java.util.List;

@Data
public class EmbeddingResponse {
    private Embedding embedding;

    @Data
    public static class Embedding{
        private List<Double> values;
    }
}
