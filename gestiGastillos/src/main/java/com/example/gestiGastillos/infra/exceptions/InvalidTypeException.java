package com.example.gestiGastillos.infra.exceptions;

public class InvalidTypeException extends RuntimeException {
    public InvalidTypeException(String message) {
        super(message);
    }
}
