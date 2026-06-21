package com.aip.academic_intelligence_platform.rag.memory;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Conversation {
    private List<Message> message=new ArrayList<>();
}
