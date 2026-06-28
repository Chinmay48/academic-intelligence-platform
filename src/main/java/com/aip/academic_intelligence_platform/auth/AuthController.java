package com.aip.academic_intelligence_platform.auth;


import com.aip.academic_intelligence_platform.auth.dto.AuthResponse;
import com.aip.academic_intelligence_platform.auth.dto.LoginRequest;
import com.aip.academic_intelligence_platform.auth.dto.RegisterRequest;
import com.aip.academic_intelligence_platform.auth.dto.UserProfileResponse;
import com.aip.academic_intelligence_platform.exception.ResourceNotFoundException;
import com.aip.academic_intelligence_platform.user.UserRespository;
import com.aip.academic_intelligence_platform.user.User;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
     private  final  AuthService authService;
     private final UserRespository userRespository;
     @PostMapping("/register")
     public String register(@RequestBody RegisterRequest request){
         return authService.register(request);
     }

     @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){
         return  authService.login(request);
     }

     @GetMapping("/accounts/me")
     public ResponseEntity<UserProfileResponse> getMyProfile(Authentication authentication){
         User user=userRespository.findByEmail(authentication.getName()).orElseThrow(()->new ResourceNotFoundException("User not found"));
        return ResponseEntity.ok(new UserProfileResponse(user.getId(),user.getName(),user.getEmail(),user.getRole(),user.getDepartment().getName(),user.getYear()));
     }



}
