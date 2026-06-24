package com.aip.academic_intelligence_platform.pyq.dto;



import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class VisionRequest {
    private List<Content> contents;
    @Data
    @AllArgsConstructor
    public static class Content{
        private List<Part> parts;
    }
    @Data
    @AllArgsConstructor
    public static class Part{
        private String text;
        private InlineData inlineData;
    }

    @Data
    @AllArgsConstructor
    public static class InlineData{
        private String mimeType;
        private String data;
    }
}
