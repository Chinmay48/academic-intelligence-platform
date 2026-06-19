package com.aip.academic_intelligence_platform.embedding;

import java.util.List;

public interface EmbeddingService {
    List<Double> generateEmbedding(String text);
}
