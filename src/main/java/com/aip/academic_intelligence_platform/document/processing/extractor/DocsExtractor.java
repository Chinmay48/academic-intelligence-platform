package com.aip.academic_intelligence_platform.document.processing.extractor;

import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class DocsExtractor implements  DocumentExtractor{
    @Override
    public String extractText(String filePath){
        try(XWPFDocument document=new XWPFDocument(Files.newInputStream(Paths.get(filePath)))){
            XWPFWordExtractor extractor=new XWPFWordExtractor(document);
            return  extractor.getText();
        } catch (IOException ex) {
            throw new RuntimeException("Failed to extract the DOCX text ",ex);
        }
    }
}
