package com.aip.academic_intelligence_platform.rag.service;

import com.aip.academic_intelligence_platform.embedding.dto.RetrivedChunk;
import com.aip.academic_intelligence_platform.rag.dto.CitationDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CitationService {
    public List<CitationDto> buildCitations(
            List<RetrivedChunk> chunks
    ){
        return chunks.stream().map(chunk->new CitationDto(chunk.docuementName(),null)).distinct().toList();
    }

}
