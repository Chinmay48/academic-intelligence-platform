package com.aip.academic_intelligence_platform.pyq.parser;

import com.aip.academic_intelligence_platform.pyq.dto.VisionRequest;
import com.aip.academic_intelligence_platform.pyq.dto.VisionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.io.File;
import java.nio.file.Files;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GeminiVisionOCRServiceImpl
        implements GeminiVisionOCRService {

    private final RestClient restClient;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.vision.url}")
    private String visionUrl;

    private String imageToBase64(
            File imageFile
    ) {

        try {

            byte[] bytes =
                    Files.readAllBytes(
                            imageFile.toPath()
                    );

            return Base64
                    .getEncoder()
                    .encodeToString(bytes);

        } catch (Exception ex) {

            throw new RuntimeException(
                    "Failed to convert image to Base64",
                    ex
            );
        }
    }

    @Override
    public String extractText(
            File imageFile
    ) {

        String base64 =
                imageToBase64(imageFile);

        VisionRequest request =
                new VisionRequest(
                        List.of(
                                new VisionRequest.Content(
                                        List.of(

                                                new VisionRequest.Part(
                                                        """
Extract all text from this question paper.

Preserve:
- Question numbers
- Marks
- CO values
- Subject details
- Branch
- Exam type

Return only plain text.
""",
                                                        null
                                                ),

                                                new VisionRequest.Part(
                                                        null,

                                                        new VisionRequest
                                                                .InlineData(

                                                                "image/png",

                                                                base64
                                                        )
                                                )
                                        )
                                )
                        )
                );

        VisionResponse response =
                restClient
                        .post()
                        .uri(
                                visionUrl
                                        + "?key="
                                        + apiKey
                        )
                        .body(request)
                        .retrieve()
                        .body(
                                VisionResponse.class
                        );

        if(
                response == null
                        ||
                        response.getCandidates() == null
                        ||
                        response.getCandidates().isEmpty()
        ){
            throw new RuntimeException(
                    "No OCR response from Gemini"
            );
        }

        return response
                .getCandidates()
                .get(0)
                .getContent()
                .getParts()
                .get(0)
                .getText();
    }
}