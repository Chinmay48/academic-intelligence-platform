package com.aip.academic_intelligence_platform.rag.dto;

import java.util.List;

public record ChatResponse(String answer, List<CitationDto> citations) {
}
