package com.aip.academic_intelligence_platform.rag.controller;

import com.aip.academic_intelligence_platform.rag.client.GeminiChatClient;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class GeminiTestController {
    private final GeminiChatClient chatClient;
    @GetMapping("/gemini")
    public String test(@RequestParam String prompt){
        return chatClient.generateAnswer(prompt);
    }
}
