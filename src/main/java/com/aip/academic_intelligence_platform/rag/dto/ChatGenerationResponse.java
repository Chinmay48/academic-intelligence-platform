package com.aip.academic_intelligence_platform.rag.dto;

import lombok.Data;

import java.util.List;

@Data
public class ChatGenerationResponse {
    private List<Candidate> candidates;

    @Data
    public static class Candidate{
        private Content content;
    }
    @Data
    public static class Content{
        private List<Part> parts;
    }
    @Data
    public static class Part{
      private String text;
    }
}
