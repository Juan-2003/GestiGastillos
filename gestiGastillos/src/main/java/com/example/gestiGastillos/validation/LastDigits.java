package com.example.gestiGastillos.validation;

import com.example.gestiGastillos.infra.exceptions.InvalidLastDigitsException;

public class LastDigits {
    public static void lastDigitsValidator(String lastDigits){
        if(lastDigits.length() != 4){
            throw new InvalidLastDigitsException("Deben de ser 4 digitos");
        }
        if(!lastDigits.matches("\\d+")){
            throw new InvalidLastDigitsException("Solo se aceptan números: " + lastDigits);

        }
    }
}
