package com.aip.academic_intelligence_platform.document.processing.extractor;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class PDFExtractor implements DocumentExtractor {
    @Override
    public String extractText(
            String filePath) {

        try (
                PDDocument document =
                        Loader.loadPDF(
                                new File(filePath)
                        )
        ) {

            PDFTextStripper stripper =
                    new PDFTextStripper();

            return stripper.getText(
                    document
            );

        } catch (IOException ex) {

            throw new RuntimeException(
                    "Failed to extract PDF text",
                    ex
            );
        }
    }
}
