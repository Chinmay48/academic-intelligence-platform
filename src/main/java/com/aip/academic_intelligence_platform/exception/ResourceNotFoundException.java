package com.aip.academic_intelligence_platform.exception;

public class ResourceNotFoundException extends  RuntimeException{
    public  ResourceNotFoundException(String message){
        super(message);
    }
}
