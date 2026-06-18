package com.aip.academic_intelligence_platform.exception;

import com.aip.academic_intelligence_platform.common.enums.dto.ApiResponse;
import com.aip.academic_intelligence_platform.subject.Subject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
@RestControllerAdvice
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

    @ExceptionHandler(DepartmentAlreadyException.class)
    public  ResponseEntity<ApiResponse> handleDepartmentAlreadyException(DepartmentAlreadyException ex){
        return  ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(false,ex.getMessage()));
    }

    @ExceptionHandler(SubjectAlreadyExistsException.class)
    public ResponseEntity<ApiResponse> handleSubjectAlreadyException(SubjectAlreadyExistsException ex){
        return  ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(false,ex.getMessage()));
    }

    @ExceptionHandler(InvalidFileException.class)
    public ResponseEntity<ApiResponse> handleInvalidFileException(InvalidFileException ex){
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(new ApiResponse(false,ex.getMessage()));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponse> handleUnauthorizedException(UnauthorizedException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false,ex.getMessage()));
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiResponse> handleValidationException(ValidationException ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false,ex.getMessage()));
    }
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiResponse>
    handleMaxUploadSizeExceeded(
            MaxUploadSizeExceededException ex){

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        new ApiResponse(
                                false,
                                "File size exceeds 25 MB"
                        )
                );
    }
}
