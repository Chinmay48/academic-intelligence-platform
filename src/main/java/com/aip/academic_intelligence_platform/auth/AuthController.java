package com.aip.academic_intelligence_platform.auth;


import com.aip.academic_intelligence_platform.auth.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
     private  final  AuthService authService;
     @PostMapping("/register")
     public String register(@RequestBody RegisterRequest request){
         return authService.register(request);
     }
}
