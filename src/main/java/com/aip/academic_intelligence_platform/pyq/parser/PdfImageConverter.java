package com.aip.academic_intelligence_platform.pyq.parser;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class PdfImageConverter {

    public List<File> convertPdfToImages(
            File pdfFile
    ) {

        try {

            List<File> images =
                    new ArrayList<>();

            PDDocument document =
                    Loader.loadPDF(pdfFile);

            PDFRenderer renderer =
                    new PDFRenderer(document);

            for(
                    int i = 0;
                    i < document.getNumberOfPages();
                    i++
            ){

                BufferedImage image =
                        renderer.renderImageWithDPI(
                                i,
                                300
                        );

                File tempImage =
                        File.createTempFile(
                                "page_" + i,
                                ".png"
                        );

                javax.imageio.ImageIO.write(
                        image,
                        "png",
                        tempImage
                );

                images.add(
                        tempImage
                );
            }

            document.close();

            return images;

        } catch (Exception e){

            throw new RuntimeException(
                    e
            );
        }
    }
}