package com.aip.academic_intelligence_platform.pyq;

import com.aip.academic_intelligence_platform.pyq.parser.GeminiVisionOCRServiceImpl;
import com.aip.academic_intelligence_platform.pyq.parser.PdfImageConverter;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

public class PdfImageConverterTest {

    public static void main(String[] args) {
        // 1. Initialize the converter exactly as it is written
        PdfImageConverter converter = new PdfImageConverter();

        // 2. Locate the test.pdf file relative to this test directory
        // Change this line in your PdfImageConverterTest.java
        File pdfFile = new File("test.pdf");


        // Safety check to ensure your PDF is in the right spot
        if (!pdfFile.exists()) {
            System.err.println("ERROR: test.pdf not found at: " + pdfFile.getAbsolutePath());
            System.err.println("Please make sure test.pdf is placed in the correct folder.");
            return;
        }

        System.out.println("--- Starting PDF to Image Conversion ---");
        System.out.println("Processing file: " + pdfFile.getName());

        try {
            // 3. Execute the independent converter
            List<File> generatedImages = converter.convertPdfToImages(pdfFile);

            System.out.println("\n--- Verification Results ---");
            System.out.println("Total pages extracted: " + generatedImages.size());

            // 4. Verify that each file exists and print its location
            for (int i = 0; i < generatedImages.size(); i++) {
                File img = generatedImages.get(i);

                System.out.println("\nChecking Expected Page " + i + ":");
                System.out.println("-> File Name: " + img.getName());
                System.out.println("-> Absolute Path: " + img.getAbsolutePath());
                System.out.println("-> Physical File Exists? " + (img.exists() ? "✅ YES" : "❌ NO"));
            }

            System.out.println("\n--- Foundation Verification Complete ---");

        } catch (Exception e) {
            System.err.println("Conversion failed with an error:");
            e.printStackTrace();
        }
    }

}
