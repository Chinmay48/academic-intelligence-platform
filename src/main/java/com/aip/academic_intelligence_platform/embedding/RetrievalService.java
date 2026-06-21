package com.aip.academic_intelligence_platform.embedding;

import com.aip.academic_intelligence_platform.document.DocumentChunk;
import com.aip.academic_intelligence_platform.document.DocumentChunkRepository;
import com.aip.academic_intelligence_platform.embedding.dto.RetrivedChunk;
import com.aip.academic_intelligence_platform.vectorsearch.CosineSimilarityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RetrievalService {
    private final DocumentChunkRepository repository;
    private final EmbeddingService embeddingService;
    private final EmbeddingParser parser;
    private final CosineSimilarityService similarityService;

    public List<RetrivedChunk> retrieve(String question,String departmentId){
        List<Double> queryEmbedding=embeddingService.generateEmbedding(question);
        List<DocumentChunk> chunks=repository.findByDocumentSubjectDepartmentId(departmentId);

        return chunks.stream().map(chunk->{
            List<Double> chunkEmbedding=parser.fromJson(chunk.getEmbedding());
            double similarity=similarityService.calculate(queryEmbedding,chunkEmbedding);
            return new RetrivedChunk(chunk.getDocument().getTitle(),chunk.getChunkText(),chunk.getChunkOrder(),chunk.getPageNumber(),similarity);
        }).filter(chunk->chunk.similarity()>0.50).sorted((a,b)->Double.compare(b.similarity(),a.similarity())).limit(5).toList();
    }

}
