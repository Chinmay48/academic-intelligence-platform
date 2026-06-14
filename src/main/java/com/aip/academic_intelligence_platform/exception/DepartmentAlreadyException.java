package com.aip.academic_intelligence_platform.exception;

public class DepartmentAlreadyException extends RuntimeException{
    public DepartmentAlreadyException(String message){
        super(message);
    }
}
