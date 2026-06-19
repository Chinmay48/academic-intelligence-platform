package com.aip.academic_intelligence_platform.document.processing.extractor;

import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFShape;
import org.apache.poi.xslf.usermodel.XSLFSlide;
import org.apache.poi.xslf.usermodel.XSLFTextShape;


import java.io.IOException;
import java.nio.file.Files;

import java.nio.file.Paths;

public class PPTExtractor implements  DocumentExtractor{
    @Override
    public String extractText(
            String filePath) {

        try (
                XMLSlideShow ppt =
                        new XMLSlideShow(
                                Files.newInputStream(
                                        Paths.get(filePath)
                                )
                        )
        ) {

            StringBuilder builder =
                    new StringBuilder();

            for(XSLFSlide slide :
                    ppt.getSlides()) {

                for(XSLFShape shape :
                        slide.getShapes()) {

                    if(shape instanceof XSLFTextShape
                            textShape) {

                        builder.append(
                                textShape.getText()
                        );

                        builder.append("\n");
                    }
                }
            }

            return builder.toString();

        } catch(IOException ex) {

            throw new RuntimeException(
                    "Failed to extract PPT text",
                    ex
            );
        }
    }
}
