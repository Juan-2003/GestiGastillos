package com.example.gestiGastillos.validation;

import com.example.gestiGastillos.infra.exceptions.InvalidCreditLimitException;
import com.example.gestiGastillos.util.DateConverter;

import java.time.LocalDate;

public class ExpirationDate {
    public static void expirationDateValidator(String userExpirationDate){
        LocalDate expirationDate = DateConverter.dateConverter(userExpirationDate);

        if(expirationDate.isBefore(LocalDate.now()) || expirationDate.equals(LocalDate.now())){
            throw new InvalidCreditLimitException("La fecha ingresada no puede ser el dia en curso, ni dias previos: " + expirationDate);
        }
        throw new RuntimeException("dgfrosdfkjed");
    }
}
