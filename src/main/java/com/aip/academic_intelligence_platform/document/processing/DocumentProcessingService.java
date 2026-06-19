package com.aip.academic_intelligence_platform.document.processing;

import com.aip.academic_intelligence_platform.document.Document;
import com.aip.academic_intelligence_platform.document.DocumentChunk;
import com.aip.academic_intelligence_platform.document.DocumentChunkRepository;
import com.aip.academic_intelligence_platform.document.DocumentRepository;
import com.aip.academic_intelligence_platform.document.processing.chunking.ChunkingService;
import com.aip.academic_intelligence_platform.document.processing.extractor.DocsExtractor;
import com.aip.academic_intelligence_platform.document.processing.extractor.PDFExtractor;
import com.aip.academic_intelligence_platform.document.processing.extractor.PPTExtractor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentProcessingService {
    private final PDFExtractor pdfExtractor;
    private final PPTExtractor pptExtractor;
    private final DocsExtractor docsExtractor;
    private final ChunkingService chunkingService;
    private final DocumentChunkRepository documentChunkRepository;
    private final DocumentRepository documentRepository;

    public void processDocument(Document document){
        String extractText="";
        switch (document.getDocumentType()){
            case PDF -> extractText=pdfExtractor.extractText(document.getFilePath());
            case PPT,PPTX -> extractText=pptExtractor.extractText(document.getFilePath());
            case DOC,DOCX -> extractText=docsExtractor.extractText(document.getFilePath());
            default -> throw new RuntimeException("Unsupported document type");
        }
        saveChunks(document,extractText);
        document.setProcessed(true);
        documentRepository.save(document);
    }

    private void saveChunks(Document document,String text){
        List<String> chunks= chunkingService.chunkText(text);
        int startCharacter=0;
        for(int i=0;i<chunks.size();i++){
            String chunkText=chunks.get(i);
            DocumentChunk chunk=new DocumentChunk();
            chunk.setDocument(document);
            chunk.setChunkText(chunkText);
            chunk.setChunkOrder(i+1);
            chunk.setStartCharacter(startCharacter);
            chunk.setEndCharacter(startCharacter+chunkText.length());
            startCharacter+=chunkText.length();
        }
    }
}
