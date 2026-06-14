package com.aip.academic_intelligence_platform.exception;

import com.aip.academic_intelligence_platform.common.enums.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class GlobalExceptionHandler {
    @ExceptionHandler(
            UserAlreadyExistsException.class
    )
    public ResponseEntity<ApiResponse> handleUserAlreadyExists(UserAlreadyExistsException ex){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(false,ex.getMessage()));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public  ResponseEntity<ApiResponse> handleResourceNotFound(ResourceNotFoundException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false,ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGeneralException(Exception ex){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(false,ex.getMessage()));
    }
}
