package com.aip.academic_intelligence_platform.document;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "document_chunks")
@Data
public class DocumentChunk {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JoinColumn(name="document_id")
    private Document document;

    @Column(columnDefinition = "TEXT")
    private String chunkText;
    private Integer chunkOrder;
    private Integer startCharacter;
    private Integer endCharacter;
    @Column(columnDefinition = "TEXT")
    private String embedding;
    private Integer pageNumber;

}
