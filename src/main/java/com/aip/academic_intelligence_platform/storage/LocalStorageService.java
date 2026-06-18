package com.aip.academic_intelligence_platform.storage;

import com.aip.academic_intelligence_platform.exception.InvalidFileException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


@Service
public class LocalStorageService
        implements FileStorageService {

    private static final String UPLOAD_DIR = "uploads";

    @Override
    public String storeFile(MultipartFile file) {

        try {

            String fileName =
                    file.getOriginalFilename();

            String folder =
                    getFolder(fileName);

            Path uploadPath =
                    Paths.get(
                            UPLOAD_DIR,
                            folder
                    );

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath =
                    uploadPath.resolve(fileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            return filePath.toAbsolutePath().toString();

        } catch (IOException ex) {

            throw new InvalidFileException(
                    "Could not store file"
            );
        }
    }

    // Helper Method
    private String getFolder(String fileName) {

        if(fileName == null) {
            throw new InvalidFileException(
                    "File name is missing"
            );
        }

        String lower =
                fileName.toLowerCase();

        if(lower.endsWith(".pdf")) {
            return "pdf";
        }

        if(lower.endsWith(".ppt")
                || lower.endsWith(".pptx")) {
            return "ppt";
        }

        if(lower.endsWith(".doc")
                || lower.endsWith(".docx")) {
            return "doc";
        }

        throw new InvalidFileException(
                "Unsupported file type"
        );
    }
}