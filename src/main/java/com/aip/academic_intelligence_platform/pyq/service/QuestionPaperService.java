package com.aip.academic_intelligence_platform.pyq.service;

import com.aip.academic_intelligence_platform.department.Department;
import com.aip.academic_intelligence_platform.department.DepartmentRepository;
import com.aip.academic_intelligence_platform.exception.ResourceNotFoundException;
import com.aip.academic_intelligence_platform.pyq.ExamQuestionRepository;
import com.aip.academic_intelligence_platform.pyq.QuestionPaper;
import com.aip.academic_intelligence_platform.pyq.QuestionPaperRepository;
import com.aip.academic_intelligence_platform.pyq.dto.ParsedQuestionPaperDto;
import com.aip.academic_intelligence_platform.pyq.parser.QuestionPaperParserService;
import com.aip.academic_intelligence_platform.subject.Subject;
import com.aip.academic_intelligence_platform.subject.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class QuestionPaperService {
    private final QuestionPaperRepository questionPaperRepository;
    private final ExamQuestionRepository questionRepository;
    private final QuestionPaperParserService questionPaperParserService;

    public String uploadQuestionPaper(MultipartFile file){
        ParsedQuestionPaperDto dto=questionPaperParserService.parse(file);
        QuestionPaper paper=saveQuestionPaper(dto);
        return paper.getId();
    }

    private QuestionPaper saveQuestionPaper(ParsedQuestionPaperDto dto){
        QuestionPaper paper=new QuestionPaper();
        paper.setBranch(dto.getBranch());
        paper.setSubjectName(dto.getSubjectName());
        paper.setSubjectCode(dto.getSubjectCode());
        paper.setExamType(dto.getExamType());
        paper.setYear(dto.getYear());
        paper.setTotalMarks(dto.getTotalMarks());
        return questionPaperRepository.save(paper);
    }
}
