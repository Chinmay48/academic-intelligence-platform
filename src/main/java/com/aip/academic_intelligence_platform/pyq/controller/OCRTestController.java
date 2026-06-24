package com.aip.academic_intelligence_platform.pyq.controller;

import com.aip.academic_intelligence_platform.pyq.parser.GeminiVisionOCRService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class OCRTestController {

    private final GeminiVisionOCRService
            visionOCRService;

    @PostMapping("/ocr")
    public String testOCR(
            @RequestParam("file")
            MultipartFile file
    ) throws Exception {

        File temp =
                File.createTempFile(
                        "ocr-test",
                        ".png"
                );

        file.transferTo(temp);

        String text =
                visionOCRService
                        .extractText(temp);

        temp.delete();

        return text;
    }
}