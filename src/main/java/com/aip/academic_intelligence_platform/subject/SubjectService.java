package com.aip.academic_intelligence_platform.subject;

import com.aip.academic_intelligence_platform.department.Department;
import com.aip.academic_intelligence_platform.department.DepartmentRepository;
import com.aip.academic_intelligence_platform.exception.ResourceNotFoundException;
import com.aip.academic_intelligence_platform.exception.SubjectAlreadyExistsException;
import com.aip.academic_intelligence_platform.subject.dto.SubjectRequest;
import com.aip.academic_intelligence_platform.subject.dto.SubjectResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private  final SubjectRepository subjectRepository;
    private final DepartmentRepository departmentRepository;

    public SubjectResponse createSubject(SubjectRequest request){
        Department department=departmentRepository.findById(request.departmentId()).orElseThrow(()->new ResourceNotFoundException("Department NotFound"));
        if(subjectRepository.existsByNameAndDepartmentId(request.name(),request.departmentId())){
            throw  new SubjectAlreadyExistsException("Subject Already exists");
        }
        Subject subject=new Subject();
        subject.setName(request.name());
        subject.setDepartment(department);
        subjectRepository.save(subject);
        return  new SubjectResponse(subject.getId(), subject.getName(), department.getId(),department.getName());
    }

    public List<SubjectResponse> getAllSubjects(){
        return  subjectRepository.findAll()
                .stream()
                .map(subject -> new SubjectResponse(subject.getId(),subject.getName(),subject.getDepartment().getId(),subject.getDepartment().getName())).toList();

    }

    public List<SubjectResponse> getSubjectsByDepartment(String departmentId){
        return subjectRepository.findByDepartmentId(departmentId)
                .stream()
                .map(subject -> new SubjectResponse(subject.getId(),subject.getName(),subject.getDepartment().getId(),subject.getDepartment().getName())).toList();
    }
}
