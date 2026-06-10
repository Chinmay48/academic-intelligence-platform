package com.aip.academic_intelligence_platform.auth.dto;

import com.aip.academic_intelligence_platform.common.enums.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
}
