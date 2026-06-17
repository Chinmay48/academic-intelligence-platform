package com.aip.academic_intelligence_platform.subject;


import com.aip.academic_intelligence_platform.subject.dto.SubjectRequest;
import com.aip.academic_intelligence_platform.subject.dto.SubjectResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
public class SubjectController {
       private  final  SubjectService subjectService;

       @PostMapping
       @PreAuthorize("hasRole('ADMIN')")
       public ResponseEntity<SubjectResponse> createSubject(@RequestBody SubjectRequest request){
             return  ResponseEntity.status(HttpStatus.CREATED).body(subjectService.createSubject(request));
       }

       @GetMapping()
       @PreAuthorize("hasAnyRole('ADMIN','STUDENT','FACULTY')")
       public ResponseEntity<List<SubjectResponse>> getAllSubjects(){
           return ResponseEntity.status(HttpStatus.OK).body(subjectService.getAllSubjects());
       }

       @GetMapping("/department/{departmentId}")
       @PreAuthorize("hasAnyRole('ADMIN','STUDENT','FACULTY')")
       public ResponseEntity<List<SubjectResponse>> getAllSubjectsByDepartment(@PathVariable String departmentId){
           return ResponseEntity.status(HttpStatus.OK).body(subjectService.getSubjectsByDepartment(departmentId));
       }
}
