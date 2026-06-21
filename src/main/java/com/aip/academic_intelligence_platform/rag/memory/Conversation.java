package com.aip.academic_intelligence_platform.rag.memory;

import com.aip.academic_intelligence_platform.user.User;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    private User user;
    @CreationTimestamp
    private LocalDateTime createdAt;

}
