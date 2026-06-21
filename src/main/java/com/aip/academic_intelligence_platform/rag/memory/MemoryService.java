package com.aip.academic_intelligence_platform.rag.memory;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MemoryService {
    private final Map<String,Conversation> memory =new ConcurrentHashMap<>();
    public Conversation getConversation(String userId){
        return  memory.computeIfAbsent(userId,id->new Conversation());
    }
    public void addMessage(
            String userId,
            String role,
            String content
    ){

        Conversation conversation =
                getConversation(userId);

        conversation.getMessage()
                .add(
                        new Message(
                                role,
                                content
                        )
                );

        if(
                conversation
                        .getMessage()
                        .size()
                        > 20
        ){
            conversation
                    .getMessage()
                    .remove(0);
        }
    }
    public void clearConversation(String userId){
        memory.remove(userId);
    }
}
