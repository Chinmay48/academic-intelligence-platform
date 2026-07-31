package com.aip.academic_intelligence_platform.user;

import com.aip.academic_intelligence_platform.common.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;
import java.util.List;

public  interface UserRespository extends JpaRepository<User, String>{
        Optional<User> findByEmail(String email);
        boolean existsByEmail(String email);
        long countByRole(Role role);
        List<User> findAllByOrderByCreatedAtDesc();
    }

