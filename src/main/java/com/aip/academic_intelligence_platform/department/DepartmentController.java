package com.aip.academic_intelligence_platform.department;


import com.aip.academic_intelligence_platform.department.dto.DepartmentRequest;
import com.aip.academic_intelligence_platform.department.dto.DepartmentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/department")
@RequiredArgsConstructor
public class DepartmentController {
      private  final DepartmentService departmentService;

      @PostMapping
      @PreAuthorize("hasRole('ADMIN')")
      public ResponseEntity<DepartmentResponse>  createDepartment(@RequestBody DepartmentRequest request){
          return ResponseEntity.status(HttpStatus.CREATED).body(departmentService.createDepartment(request));
      }
      @GetMapping
      @PreAuthorize(
              "hasAnyRole('ADMIN','FACULTY','STUDENT')")
      public ResponseEntity<List<DepartmentResponse>> getAllDepartments(){
          return ResponseEntity.ok(departmentService.getAllDepartments());
      }

      @GetMapping("/{id}")
      public ResponseEntity<DepartmentResponse> getDepartmentById(@PathVariable String id){
          return ResponseEntity.ok(departmentService.getDepartmentById(id));
      }

      @PutMapping("/{id}")
      @PreAuthorize("hasRole('ADMIN')")
      public  ResponseEntity<DepartmentResponse> updateDepartmentById(@RequestBody DepartmentRequest request,@PathVariable String id){
          return ResponseEntity.ok(departmentService.updateDepartmentById(request,id));
      }

      @DeleteMapping("/{id}")
      @PreAuthorize("hasRole('ADMIN')")
      public  ResponseEntity<Void> deleteDepartmentById(@PathVariable String id){
          departmentService.deleteDepartmentById(id);
          return ResponseEntity.noContent().build();
      }
}
