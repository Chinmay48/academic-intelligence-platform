package com.aip.academic_intelligence_platform.rag.dto;

import lombok.Data;

@Data
public class ConversationRequest {
    private String question;
    private String conversationId;
}
