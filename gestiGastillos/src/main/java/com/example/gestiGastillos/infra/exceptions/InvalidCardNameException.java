package com.example.gestiGastillos.infra.exceptions;

public class InvalidCardNameException extends RuntimeException{
    public InvalidCardNameException(String message){
        super(message);
    }
}
