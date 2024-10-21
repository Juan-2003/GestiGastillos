package com.example.gestiGastillos.infra.exceptions;

public class InvalidExpirationDateException extends RuntimeException{
    public InvalidExpirationDateException(String message){
        super(message);
    }
}
