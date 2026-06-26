package com.aip.academic_intelligence_platform.pyq.service;


import com.aip.academic_intelligence_platform.exception.ResourceNotFoundException;
import com.aip.academic_intelligence_platform.pyq.ExamQuestion;
import com.aip.academic_intelligence_platform.pyq.ExamQuestionRepository;
import com.aip.academic_intelligence_platform.pyq.QuestionPaper;
import com.aip.academic_intelligence_platform.pyq.QuestionPaperRepository;
import com.aip.academic_intelligence_platform.pyq.dto.ExamQuestionResponse;
import com.aip.academic_intelligence_platform.pyq.dto.ParsedQuestionDto;
import com.aip.academic_intelligence_platform.pyq.dto.ParsedQuestionPaperDto;
import com.aip.academic_intelligence_platform.pyq.dto.QuestionPaperResponse;
import com.aip.academic_intelligence_platform.pyq.parser.QuestionPaperParserService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionPaperService {
    private final QuestionPaperRepository questionPaperRepository;
    private final ExamQuestionRepository questionRepository;
    private final QuestionPaperParserService questionPaperParserService;

    public String uploadQuestionPaper(MultipartFile file){
        ParsedQuestionPaperDto dto=questionPaperParserService.parse(file);
        QuestionPaper paper=saveQuestionPaper(dto);
        saveQuestions(paper,dto);
         return paper.getId();
    }

    private void saveQuestions(QuestionPaper paper, ParsedQuestionPaperDto dto) {
        List<ParsedQuestionDto> questions=dto.getQuestions();
        for(ParsedQuestionDto parsedQuestion:questions){
            ExamQuestion question=new ExamQuestion();
            question.setQuestionPaper(paper);
            question.setSection(parsedQuestion.getSection());
            question.setQuestionNumber(parsedQuestion.getQuestionNumber());
            question.setMarks(parsedQuestion.getMarks());
            question.setCourseOutcome(parsedQuestion.getCourseOutcome());
            question.setQuestionText(parsedQuestion.getQuestionText());
            question.setTopic(null);
            questionRepository.save(question);
        }
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

    public List<QuestionPaperResponse> getAllQuestionPapers(){
        return questionPaperRepository.findAll().stream().map(paper-> new QuestionPaperResponse(paper.getId(),paper.getSubjectName(),paper.getSubjectCode(),paper.getBranch(),paper.getYear(),paper.getExamType(),paper.getTotalMarks())).toList();
    }
    public QuestionPaperResponse getQuestionPaper(String id){
        QuestionPaper paper=questionPaperRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Question paper not found"));
        return new QuestionPaperResponse(paper.getId(),paper.getSubjectName(),paper.getSubjectCode(),paper.getBranch(),paper.getYear(),paper.getExamType(),paper.getTotalMarks());
    }

    public List<ExamQuestionResponse>  getQuestions(String paperId){
        return questionRepository.findByQuestionPaperId(paperId).stream().map(
                question-> new ExamQuestionResponse(
                        question.getId(),
                        question.getSection(),
                        question.getQuestionNumber(),
                        question.getMarks(),
                        question.getCourseOutcome(),
                        question.getTopic(),
                        question.getQuestionText()
                )
        ).toList();
    }


}
