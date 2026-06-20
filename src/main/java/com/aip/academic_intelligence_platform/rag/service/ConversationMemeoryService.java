package com.aip.academic_intelligence_platform.rag.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ConversationMemeoryService {
    private final Map<String, List<String>> memory =new HashMap<>();
}
