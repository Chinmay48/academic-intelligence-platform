package com.aip.academic_intelligence_platform.rag.memory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation,String> {
    Optional<Conversation> findByUserId(String userId);
}
