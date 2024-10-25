package com.example.gestiGastillos.infra.exceptions;

public class InvalidDebtException extends RuntimeException{
    public InvalidDebtException(String message){
        super(message);
    }
}
