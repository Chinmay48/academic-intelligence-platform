package com.aip.academic_intelligence_platform.rag.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatGenerationRequest {
    private List<Content> contents;



    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Content{
        private List<Part> parts;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Part{
        private String text;
    }
}

