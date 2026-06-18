package com.aip.academic_intelligence_platform.document;

import com.aip.academic_intelligence_platform.subject.Subject;
import com.aip.academic_intelligence_platform.user.User;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String title;
    private String description;
    private String fileName;
    private String filePath;
    @Enumerated(EnumType.STRING)
    private DocumentType documentType;
    private boolean processed;
    @ManyToOne
    @JoinColumn(name="subject_id")
    private Subject subject;
    @ManyToOne
    @JoinColumn(name="uploaded_by")
    private User uploadedBy;
    @CreationTimestamp
    private LocalDateTime createdAt;

}
