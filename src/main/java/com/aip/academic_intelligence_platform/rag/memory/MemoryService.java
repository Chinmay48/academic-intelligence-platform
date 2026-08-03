package com.aip.academic_intelligence_platform.rag.memory;

import com.aip.academic_intelligence_platform.exception.ResourceNotFoundException;
import com.aip.academic_intelligence_platform.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemoryService {
        private final ConversationRepository conversationRepository;
        private final MessageRepository messageRepository;

        public Conversation getConversation(String conversationId,
                        User user) {

                return conversationRepository

                                .findByIdAndUserId(
                                                conversationId, user.getId())
                                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));

        }

        public Conversation createConversation(User user, String firstQuestion) {
                Conversation conversation = new Conversation();
                conversation.setUser(user);
                conversation.setTitle(createTitle(firstQuestion));
                return conversationRepository.save(conversation);
        }

        public List<Conversation> getUserConversations(User user) {
                return conversationRepository.findByUserIdOrderByUpdatedAtDesc(user.getId());
        }

        public void addMessage(
                        Conversation conversation,

                        String role,
                        String content) {
                Message message = new Message();
                message.setConversation(conversation);
                message.setRole(role);
                message.setContent(content);

                messageRepository.save(message);
                conversation.setUpdatedAt(LocalDateTime.now());
                conversationRepository.save(conversation);
        }

        public void clearConversation(
                        String conversationId) {

                List<Message> messages = messageRepository
                                .findTop20ByConversationIdOrderByCreatedAtDesc(
                                                conversationId);

                messageRepository.deleteAll(
                                messages);
        }

        public List<Message> getRecentMessages(String conversationId) {

    List<Message> messages = messageRepository
            .findTop20ByConversationIdOrderByCreatedAtDesc(conversationId);

    Collections.reverse(messages);

    return messages;
}


        public String createTitle(String question) {
                if (question.length() <= 50)
                        return question;
                return question.substring(0, 47) + "...";
        }

        public List<Message> getConversationMessage(String conversationId, User user) {
                getConversation(conversationId, user);
                return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
        }

        @Transactional
        public void deleteConversation(String conversationId, User user) {
                Conversation conversation = getConversation(conversationId, user);
                messageRepository.deleteByConversationId(conversationId);
                conversationRepository.delete(conversation);
        }
}
