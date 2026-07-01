package com.aip.academic_intelligence_platform.dashboard;

import com.aip.academic_intelligence_platform.common.enums.Role;
import com.aip.academic_intelligence_platform.dashboard.dto.AdminDashboardResponse;
import com.aip.academic_intelligence_platform.dashboard.dto.FacultyDashboardResponse;
import com.aip.academic_intelligence_platform.dashboard.dto.StudentDashboardResponse;
import com.aip.academic_intelligence_platform.department.DepartmentRepository;
import com.aip.academic_intelligence_platform.document.DocumentRepository;
import com.aip.academic_intelligence_platform.pyq.QuestionPaperRepository;
import com.aip.academic_intelligence_platform.subject.SubjectRepository;
import com.aip.academic_intelligence_platform.user.User;
import com.aip.academic_intelligence_platform.user.UserRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {
  private final UserRespository userRespository;
  private final DocumentRepository documentRepository;
  private final SubjectRepository subjectRepository;
  private final DepartmentRepository departmentRepository;
  private final QuestionPaperRepository questionPaperRepository;

  public StudentDashboardResponse getStudentDashboard(User student){
      return  new StudentDashboardResponse(documentRepository.count(),subjectRepository.count(),questionPaperRepository.count(),student.getDepartment().getName());
  }

  public FacultyDashboardResponse getFacultyDashboard(User faculty){
      return new FacultyDashboardResponse(documentRepository.count(),questionPaperRepository.count(),subjectRepository.count());
  }
  public AdminDashboardResponse getAdminDashboard(){
      return new AdminDashboardResponse(userRespository.countByRole(Role.STUDENT),userRespository.countByRole(Role.FACULTY),departmentRepository.count(),subjectRepository.count(),departmentRepository.count(),questionPaperRepository.count());
  }
}
