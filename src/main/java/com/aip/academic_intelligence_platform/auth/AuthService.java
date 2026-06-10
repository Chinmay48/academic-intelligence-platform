package com.aip.academic_intelligence_platform.auth;

import com.aip.academic_intelligence_platform.auth.dto.RegisterRequest;

import com.aip.academic_intelligence_platform.user.User;
import com.aip.academic_intelligence_platform.user.UserRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRespository userRespository;
    public String register(RegisterRequest request){
        if(userRespository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exists");
        }
        User user =new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        user.setPassword(request.getPassword());
        user.setCreatedAt(LocalDateTime.now());
        userRespository.save(user);

       return "User Register Successfully";
    }
}
