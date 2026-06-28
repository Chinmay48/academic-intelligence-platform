package com.aip.academic_intelligence_platform.auth.dto;
import com.aip.academic_intelligence_platform.common.enums.Role;
public record UserProfileResponse(
        String id,
        String name,
        String email,
        Role role,
        String department,
        Integer year
) {}
