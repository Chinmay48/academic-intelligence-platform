package com.aip.academic_intelligence_platform.pyq.parser;

import org.springframework.web.multipart.MultipartFile;

public interface OCRService {
    String extractText(MultipartFile file);
}
