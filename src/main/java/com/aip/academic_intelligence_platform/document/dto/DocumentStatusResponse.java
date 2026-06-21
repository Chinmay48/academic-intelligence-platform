package com.aip.academic_intelligence_platform.document.dto;

import com.aip.academic_intelligence_platform.common.enums.ProcessingStatus;

public record DocumentStatusResponse(String documentId, String title, ProcessingStatus status) {
}
