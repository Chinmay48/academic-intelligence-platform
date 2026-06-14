package com.aip.academic_intelligence_platform.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
     @GetMapping("/test")
     public String test(){
         return "Protected Endpoint";
     }
}
