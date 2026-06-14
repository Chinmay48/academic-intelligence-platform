package com.aip.academic_intelligence_platform.exception;

public class UserAlreadyExistsException extends RuntimeException {
      public  UserAlreadyExistsException(String message){
          super(message);
      }
}
