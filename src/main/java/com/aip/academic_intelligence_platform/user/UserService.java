package com.aip.academic_intelligence_platform.user;

import com.aip.academic_intelligence_platform.auth.dto.UserProfileResponse;
import com.aip.academic_intelligence_platform.common.enums.Role;
import com.aip.academic_intelligence_platform.department.Department;
import com.aip.academic_intelligence_platform.department.DepartmentRepository;
import com.aip.academic_intelligence_platform.exception.ResourceNotFoundException;
import com.aip.academic_intelligence_platform.user.dto.UserRequest;
import com.aip.academic_intelligence_platform.user.dto.UserResponse;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRespository userRespository;
    private final DepartmentRepository departmentRepository;
    public List<UserResponse> getAllUsers(){
        return userRespository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    public UserResponse getUserById(String id){
         User user=userRespository.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found"));
         return  mapToResponse(user);
    }
    private UserResponse mapToResponse(User user) {

        return new UserResponse(

                user.getId(),

                user.getName(),

                user.getEmail(),

                user.getRole(),

                user.getDepartment() != null
                        ? user.getDepartment().getId()
                        : null,

                user.getDepartment() != null
                        ? user.getDepartment().getName()
                        : null,

                user.getYear()

        );
    }

    public  void deleteUser(String id){
        User user=userRespository.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found"));
        userRespository.delete(user);

    }

    public UserResponse updateUser(UserRequest request,String userId){
          User user=userRespository.findById(userId).orElseThrow(()->new ResourceNotFoundException("User not found"));
          Department newDepartment=departmentRepository.findById(request.departmentId()).orElseThrow(()->new ResourceNotFoundException("Departmnet not found"));
          user.setName(request.name());
          user.setDepartment(newDepartment);
          user.setEmail(request.email());
          user.setRole(Role.valueOf(request.role()));
          user.setYear(request.year());
          userRespository.save(user);
          return mapToResponse(user);
    }

}
