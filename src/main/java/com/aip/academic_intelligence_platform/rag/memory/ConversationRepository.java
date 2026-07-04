package com.aip.academic_intelligence_platform.rag.memory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation,String> {
    Optional<Conversation> findByIdAndUserId(String conversationId,String userId);

    List<Conversation> findByUserIdOrderByUpdatedAtDesc(String userId);

}
