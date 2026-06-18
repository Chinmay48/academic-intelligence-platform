package com.aip.academic_intelligence_platform.document;


import com.aip.academic_intelligence_platform.document.dto.DocumentResponse;
import com.aip.academic_intelligence_platform.exception.InvalidFileException;
import com.aip.academic_intelligence_platform.exception.ResourceNotFoundException;
import com.aip.academic_intelligence_platform.exception.UnauthorizedException;
import com.aip.academic_intelligence_platform.exception.ValidationException;
import com.aip.academic_intelligence_platform.storage.FileStorageService;
import com.aip.academic_intelligence_platform.subject.Subject;
import com.aip.academic_intelligence_platform.subject.SubjectRepository;
import com.aip.academic_intelligence_platform.user.User;
import com.aip.academic_intelligence_platform.user.UserRespository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Service
@RequiredArgsConstructor
public class DocumentService {
    private  final  DocumentRepository documentRepository;
    private  final UserRespository userRespository;

    private final SubjectRepository subjectRepository;
    private final FileStorageService fileStorageService;
    public DocumentResponse uploadDocument(MultipartFile file,String title,String description,String subjectId,String email){
        if(file.isEmpty()){
            throw  new InvalidFileException("Uploaded file is empty");
        }
        long maxSize=25*1024*1024;
        if(file.getSize()>maxSize){
            throw  new InvalidFileException("File size exceed 25 mb");
        }
        if(title == null ||
                title.trim().length() < 3){

            throw new ValidationException(
                    "Title must contain "
                            + "at least 3 characters"
            );
        }
        if(description.length() > 500){

            throw new ValidationException(
                    "Description exceeds "
                            + "500 characters"
            );
        }
        Subject subject=subjectRepository.findById(subjectId).orElseThrow(()->new ResourceNotFoundException("Subject not found"));
        User faculty=userRespository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("Faculty not found"));
        if(!faculty.getDepartment().getId().equals(subject.getDepartment().getId())){
            throw new UnauthorizedException("You cannot upload resources for other department");
        }

        String storedFilePath=fileStorageService.storeFile(file);
        Document document=new Document();
        document.setTitle(title);
        document.setDescription(description);
        document.setFileName(file.getOriginalFilename());
        document.setFilePath(storedFilePath);
        document.setSubject(subject);
        document.setUploadedBy(faculty);
        document.setProcessed(false);
        document.setDocumentType(determineDocumentType(file.getOriginalFilename()));
        documentRepository.save(document);
        return new DocumentResponse(document.getId(), document.getTitle(),  document.getDescription(), document.getFileName(),subject.getName(),faculty.getName());

    }

    private DocumentType determineDocumentType(@Nullable String filename) {
        if(filename == null){
            throw new InvalidFileException(
                    "File name is missing"
            );
        }
        String lower=filename.toLowerCase();
        if(lower.endsWith(".pdf")) return DocumentType.PDF;
        if(lower.endsWith(".ppt")) return DocumentType.PPT;
        if(lower.endsWith(".pptx")) return DocumentType.PPTX;
        if(lower.endsWith(".doc")) return DocumentType.DOC;
        if(lower.endsWith(".docx")) return DocumentType.DOCX;
        throw new RuntimeException("Unsupported file type");
    }

    public List<DocumentResponse> getDocumentsBySubject(String subjectId){
        return documentRepository.findBySubjectId(subjectId).stream().map(document -> new DocumentResponse(document.getId(),document.getTitle(),document.getDescription(),document.getFileName(),document.getSubject().getName(),document.getUploadedBy().getName())).toList();
    }

    public Document getDocument(String id){
        return documentRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Document not found"));
    }
}
