package com.aip.academic_intelligence_platform.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
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

     @GetMapping("/student")
     @PreAuthorize("hasRole('STUDENT')")
     public String student(){
         return "Student access";
     }
    @GetMapping("/faculty")
    @PreAuthorize("hasRole('FACULTY')")
    public String faculty(){
        return "Faculty access";
    }
    @GetMapping("/admin")
    @PreAuthorize("hasRole('admin')")
    public String admin(){
        return "admin access";
    }
}
