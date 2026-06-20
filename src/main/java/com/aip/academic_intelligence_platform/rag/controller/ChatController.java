package com.aip.academic_intelligence_platform.rag.controller;

import com.aip.academic_intelligence_platform.rag.dto.ChatRequest;
import com.aip.academic_intelligence_platform.rag.dto.ChatResponse;
import com.aip.academic_intelligence_platform.rag.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request){
        return ResponseEntity.ok(chatService.askQuestion(request.getQuestion()));
    }
}
