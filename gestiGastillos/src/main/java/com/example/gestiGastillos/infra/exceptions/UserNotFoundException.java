package com.example.gestiGastillos.infra.exceptions;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long userId){
        super("Usuario no encontrado con el id: " + userId);
    }
}
