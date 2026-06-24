package com.aip.academic_intelligence_platform.pyq.controller;

import com.aip.academic_intelligence_platform.pyq.dto.ParsedQuestionPaperDto;
import com.aip.academic_intelligence_platform.pyq.parser.GeminiQuestionExtractor;
import com.aip.academic_intelligence_platform.pyq.parser.GeminiVisionOCRService;
import com.aip.academic_intelligence_platform.pyq.parser.PdfImageConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class OCRTestController {

    private final GeminiVisionOCRService
            visionOCRService;

    private final PdfImageConverter
            pdfImageConverter;

    private final GeminiQuestionExtractor
            questionExtractor;

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
    @PostMapping("/parse")
    public ParsedQuestionPaperDto parse(
            @RequestParam("file")
            MultipartFile file
    ) throws Exception {

        File tempPdf =
                File.createTempFile(
                        "question-paper",
                        ".pdf"
                );

        file.transferTo(tempPdf);

        List<File> pages =
                pdfImageConverter
                        .convertPdfToImages(
                                tempPdf
                        );

        StringBuilder extractedText =
                new StringBuilder();

        for(File page : pages){

            String pageText =
                    visionOCRService
                            .extractText(page);

            extractedText
                    .append(pageText)
                    .append("\n\n");

            page.delete();
        }

        tempPdf.delete();

        return questionExtractor
                .extractQuestionPaper(
                        extractedText.toString()
                );
    }
}