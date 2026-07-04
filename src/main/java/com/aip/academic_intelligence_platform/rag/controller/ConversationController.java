package com.aip.academic_intelligence_platform.rag.controller;

import com.aip.academic_intelligence_platform.exception.ResourceNotFoundException;
import com.aip.academic_intelligence_platform.rag.dto.ConversationResponse;
import com.aip.academic_intelligence_platform.rag.dto.MessageResponse;
import com.aip.academic_intelligence_platform.rag.memory.MemoryService;
import com.aip.academic_intelligence_platform.user.User;
import com.aip.academic_intelligence_platform.user.UserRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
@RequiredArgsConstructor
public class ConversationController {
    private final MemoryService memoryService;
    private final UserRespository userRespository;

    @GetMapping
    public ResponseEntity<List<ConversationResponse>> getConversations(Authentication authentication){
        User user =getUser(authentication);
        List<ConversationResponse> response=memoryService.getUserConversations(user).stream().map(conversation -> new ConversationResponse(conversation.getId(),conversation.getTitle(),conversation.getCreatedAt(),conversation.getUpdatedAt())).toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{conversationId}/message")
    public ResponseEntity<List<MessageResponse>> getMessages(@PathVariable String conversationId,Authentication authentication){
        User user=getUser(authentication);
        List<MessageResponse> response=memoryService.getConversationMessage(conversationId,user).stream().map(message -> new MessageResponse(message.getId(),message.getRole(),message.getContent(),message.getCreatedAt())).toList();
        return  ResponseEntity.ok(response);
    }
    @DeleteMapping("/{conversationId}")
    public ResponseEntity<Void> deleteConversation(
            @PathVariable String conversationId,
            Authentication authentication
    ) {

        User user = getUser(authentication);

        memoryService.deleteConversation(
                conversationId,
                user
        );

        return ResponseEntity.noContent().build();
    }


    private User getUser(
            Authentication authentication
    ) {


        return userRespository
                .findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );
    }
}
