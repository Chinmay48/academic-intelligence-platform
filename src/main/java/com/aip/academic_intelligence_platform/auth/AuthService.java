package com.aip.academic_intelligence_platform.auth;

import com.aip.academic_intelligence_platform.auth.dto.AuthResponse;
import com.aip.academic_intelligence_platform.auth.dto.LoginRequest;
import com.aip.academic_intelligence_platform.auth.dto.RegisterRequest;

import com.aip.academic_intelligence_platform.common.enums.Role;
import com.aip.academic_intelligence_platform.department.Department;
import com.aip.academic_intelligence_platform.department.DepartmentRepository;
import com.aip.academic_intelligence_platform.exception.ResourceNotFoundException;
import com.aip.academic_intelligence_platform.exception.UserAlreadyExistsException;
import com.aip.academic_intelligence_platform.security.JwtService;
import com.aip.academic_intelligence_platform.user.User;
import com.aip.academic_intelligence_platform.user.UserRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRespository userRespository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final DepartmentRepository departmentRepository;
    public String register(RegisterRequest request){

        if(userRespository.existsByEmail(
                request.getEmail())) {

            throw new UserAlreadyExistsException(
                    "Email already exists"
            );
        }
        if(request.getRole() != Role.ADMIN
                && request.getDepartmentId()== null){

            throw new RuntimeException(
                    "Department is required"
            );
        }
        Department department =null;
        if(request.getRole()!=Role.ADMIN){

                  department=  departmentRepository.findById(
                                    request.getDepartmentId()
                            )
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Department not found"
                                    ));
        }



        User user = new User();

        user.setName(request.getName());

        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setRole(request.getRole());

        user.setDepartment(department);

        user.setYear(request.getYear());

        user.setCreatedAt(LocalDateTime.now());

        userRespository.save(user);

        return "User Registered Successfully";
    }

    public AuthResponse login(LoginRequest request) {
        if(!userRespository.existsByEmail(request.getEmail())){
            throw  new RuntimeException("User not found");

        }
        User user=userRespository.findByEmail(request.getEmail())
                .orElseThrow(()->new ResourceNotFoundException("User not found"));
        if(!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid Credentials"
            );
        }

        return new AuthResponse(
                jwtService.generateToke(user)
        );
    }
}
