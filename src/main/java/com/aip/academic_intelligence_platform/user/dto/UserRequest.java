package com.aip.academic_intelligence_platform.user.dto;

public record UserRequest(
    String name,String email,String role,String departmentId, Integer year
) {
    
}
