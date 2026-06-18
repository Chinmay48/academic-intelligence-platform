package com.aip.academic_intelligence_platform.document;


import com.aip.academic_intelligence_platform.document.dto.DocumentResponse;
import com.aip.academic_intelligence_platform.exception.InvalidFileException;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.InvalidFileNameException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {
    private final DocumentService documentService;
    private  final DocumentRepository documentRepository;

    @PostMapping("/upload")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<DocumentResponse> uploadDocument(@RequestParam("file")MultipartFile file, @RequestParam String title, @RequestParam String description, @RequestParam String subjectId, Authentication authentication){

        return ResponseEntity.status(HttpStatus.CREATED).body(documentService.uploadDocument(file,title,description,subjectId, authentication.getName()));
    }
    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<DocumentResponse>> getDocumentsBySubject(@PathVariable String subjectId){
        return ResponseEntity.ok(documentService.getDocumentsBySubject(subjectId));
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable String id) throws IOException {
        Document document=documentService.getDocument(id);
        Path path= Paths.get(document.getFilePath());
        Resource resource=new UrlResource(path.toUri());
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\""+document.getFileName()+"\"").body(resource);
    }
}


