package com.aip.academic_intelligence_platform.rag.memory;

import com.aip.academic_intelligence_platform.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class MemoryService {
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    public Conversation getConversation(
            User user
    ){

        return conversationRepository

                .findByUserId(
                        user.getId()
                )

                .orElseGet(() -> {

                    Conversation conversation =
                            new Conversation();

                    conversation.setUser(
                            user
                    );

                    conversation.setCreatedAt(
                            LocalDateTime.now()
                    );

                    return conversationRepository
                            .save(
                                    conversation
                            );
                });
    }
    public void addMessage(
            Conversation conversation,

            String role,
            String content
    ){
          Message message=new Message();
          message.setConversation(conversation);
          message.setRole(role);
          message.setContent(content);
          message.setCreatedAt(LocalDateTime.now());
          messageRepository.save(message);
    }
    public void clearConversation(
            String conversationId
    ){

        List<Message> messages =
                messageRepository
                        .findTop20ByConversationIdOrderByCreatedAtDesc(
                                conversationId
                        );

        messageRepository.deleteAll(
                messages
        );
    }
    public List<Message>
    getRecentMessages(
            String conversationId
    ){

        return messageRepository

                .findTop20ByConversationIdOrderByCreatedAtDesc(
                        conversationId
                );

    }
}
