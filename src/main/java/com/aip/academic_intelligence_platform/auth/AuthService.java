package com.aip.academic_intelligence_platform.auth;

import com.aip.academic_intelligence_platform.auth.dto.AuthResponse;
import com.aip.academic_intelligence_platform.auth.dto.LoginRequest;
import com.aip.academic_intelligence_platform.auth.dto.RegisterRequest;

import com.aip.academic_intelligence_platform.security.JwtService;
import com.aip.academic_intelligence_platform.user.User;
import com.aip.academic_intelligence_platform.user.UserRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRespository userRespository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    public String register(RegisterRequest request){
        if(userRespository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exists");
        }
        User user =new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        userRespository.save(user);

       return "User Register Successfully";
    }

    public AuthResponse login(LoginRequest request) {
        if(!userRespository.existsByEmail(request.getEmail())){
            throw  new RuntimeException("User not found");

        }
        User user=userRespository.findByEmail(request.getEmail())
                .orElseThrow(()->new RuntimeException("User not found"));
        if(passwordEncoder.matches(request.getPassword(),user.getPassword())){

            return new AuthResponse(jwtService.generateToke(user));
        }
        return new AuthResponse("Invalid credentails");
    }
}
