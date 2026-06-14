package com.aip.academic_intelligence_platform.auth;


import com.aip.academic_intelligence_platform.auth.dto.AuthResponse;
import com.aip.academic_intelligence_platform.auth.dto.LoginRequest;
import com.aip.academic_intelligence_platform.auth.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
     private  final  AuthService authService;
     @PostMapping("/register")
     public String register(@RequestBody RegisterRequest request){
         return authService.register(request);
     }

     @PostMapping("login")
    public AuthResponse login(@RequestBody LoginRequest request){
         return  authService.login(request);
     }



}
