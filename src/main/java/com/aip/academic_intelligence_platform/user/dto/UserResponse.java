package com.aip.academic_intelligence_platform.user.dto;

import com.aip.academic_intelligence_platform.common.enums.Role;

public record UserResponse (
    String id,
    String name,
    String email,
    Role role,
    String departmentId,
    String departmentName,
    Integer year
){}