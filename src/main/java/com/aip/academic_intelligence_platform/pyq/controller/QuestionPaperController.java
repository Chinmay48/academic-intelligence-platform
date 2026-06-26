package com.aip.academic_intelligence_platform.pyq.controller;


import com.aip.academic_intelligence_platform.pyq.dto.ExamQuestionResponse;
import com.aip.academic_intelligence_platform.pyq.dto.QuestionPaperResponse;
import com.aip.academic_intelligence_platform.pyq.service.QuestionPaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/pyq")
@RequiredArgsConstructor
public class QuestionPaperController {
    private final QuestionPaperService questionPaperService;

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam MultipartFile file){
        return ResponseEntity.status(HttpStatus.CREATED).body(questionPaperService.uploadQuestionPaper(file));
    }

    @GetMapping("/papers")
    public ResponseEntity<List<QuestionPaperResponse>> getAllPapers(){
        return ResponseEntity.ok(questionPaperService.getAllQuestionPapers());
    }
    @GetMapping("/papers/{id}")
    public ResponseEntity<QuestionPaperResponse> getPaper(@PathVariable String id){
        return ResponseEntity.ok(questionPaperService.getQuestionPaper(id));
    }

    @GetMapping("/questions/{paperId}")
    public ResponseEntity<List<ExamQuestionResponse>> getQuestions(@PathVariable String paperId){
        return ResponseEntity.ok(questionPaperService.getQuestions(paperId));

    }
}
