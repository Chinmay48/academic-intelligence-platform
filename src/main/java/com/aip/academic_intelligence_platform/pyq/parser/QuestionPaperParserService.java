package com.aip.academic_intelligence_platform.pyq.parser;

import com.aip.academic_intelligence_platform.pyq.dto.ParsedQuestionPaperDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionPaperParserService {
    private final PdfImageConverter pdfImageConverter;
    private final GeminiVisionOCRService geminiVisionOCRService;
    private final GeminiQuestionExtractor questionExtractor;
    public ParsedQuestionPaperDto parse(MultipartFile file){
        try{
            File tempPdf=File.createTempFile("question-paper",".pdf");
            file.transferTo(tempPdf);
            List<File> pages=pdfImageConverter.convertPdfToImages(tempPdf);
            StringBuilder extractedText=new StringBuilder();
            for(File page:pages){
                String pageText=geminiVisionOCRService.extractText(page);
                extractedText.append(pageText).append("\n\n");
                page.delete();
            }
            tempPdf.delete();
            return questionExtractor.extractQuestionPaper(extractedText.toString());
        }catch (Exception e){
           throw new RuntimeException("Unable to parse question parser");
        }
    }
}
