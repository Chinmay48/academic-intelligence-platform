package com.aip.academic_intelligence_platform.auth.dto;

import com.aip.academic_intelligence_platform.common.enums.Role;
import com.aip.academic_intelligence_platform.department.Department;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
    private String departmentId;
    private Integer year;

}
