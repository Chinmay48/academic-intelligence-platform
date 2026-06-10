package com.aip.academic_intelligence_platform.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;


public  interface UserRespository extends JpaRepository<User, UUID>{
        Optional<User> findByEmail(String email);
        boolean existsByEmail(String email);
    }

