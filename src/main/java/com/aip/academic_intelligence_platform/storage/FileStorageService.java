package com.aip.academic_intelligence_platform.storage;


import org.springframework.web.multipart.MultipartFile;


public interface FileStorageService {
    String storeFile(MultipartFile file);
}
