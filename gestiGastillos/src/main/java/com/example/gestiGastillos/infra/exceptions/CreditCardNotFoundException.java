package com.example.gestiGastillos.infra.exceptions;

public class CreditCardNotFoundException extends RuntimeException{
    public CreditCardNotFoundException(String message){
        super(message);
    }
}
