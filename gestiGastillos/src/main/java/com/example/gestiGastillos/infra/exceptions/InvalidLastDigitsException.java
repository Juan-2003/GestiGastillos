package com.example.gestiGastillos.infra.exceptions;

public class InvalidLastDigitsException extends RuntimeException{
    public InvalidLastDigitsException(String message){
        super(message);
    }
}
