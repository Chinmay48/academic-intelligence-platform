package com.aip.academic_intelligence_platform.department;
import com.aip.academic_intelligence_platform.department.dto.DepartmentRequest;
import com.aip.academic_intelligence_platform.department.dto.DepartmentResponse;
import com.aip.academic_intelligence_platform.exception.DepartmentAlreadyException;
import com.aip.academic_intelligence_platform.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository departmentRepository;

    public DepartmentResponse createDepartment(DepartmentRequest request){
        if(departmentRepository.existsByName(request.name())){
              throw new DepartmentAlreadyException("Department already exists");
        }
        Department department =new Department();
        department.setName(request.name());
        departmentRepository.save(department);
        return new DepartmentResponse(department.getId(),department.getName());
    }

    public List<DepartmentResponse> getAllDepartments(){
         return departmentRepository.findAll().stream()
                 .map(department -> new DepartmentResponse(department.getId(),department.getName())).toList();
    }

    public DepartmentResponse getDepartmentById(String id){
        Department department=  departmentRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Department not found"));

        return  new DepartmentResponse(department.getId(),department.getName());

    }



    public  DepartmentResponse updateDepartmentById( DepartmentRequest request,  String id){
        Department department=departmentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Department not found"));
        if(departmentRepository.existsByName(request.name())){
            throw new DepartmentAlreadyException("Department already exist");
        }
        department.setName(request.name());
        departmentRepository.save(department);
        return  new DepartmentResponse(department.getId(),department.getName());
    }

    public void deleteDepartmentById(String id){
        Department department =departmentRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Department not found"));
        departmentRepository.delete(department);

    }


}
