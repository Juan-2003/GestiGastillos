package com.example.gestiGastillos.infra.exceptions;

public class InvalidCreditLimitException extends RuntimeException{
    public InvalidCreditLimitException(String message){
        super(message);
    }
}

