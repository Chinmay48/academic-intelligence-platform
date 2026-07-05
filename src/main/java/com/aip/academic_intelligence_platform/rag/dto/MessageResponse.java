package com.aip.academic_intelligence_platform.rag.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MessageResponse {
    private String id;
    private String role;
    private String context;
    private LocalDateTime createdAt;
}

