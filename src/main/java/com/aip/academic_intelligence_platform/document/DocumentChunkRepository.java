package com.aip.academic_intelligence_platform.document;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentChunkRepository extends JpaRepository<DocumentChunk,String > {
    List<DocumentChunk> findByDocumentIdOrderByChunkOrder(String documentId);
}
