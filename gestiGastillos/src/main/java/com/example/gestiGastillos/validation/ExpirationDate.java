package com.example.gestiGastillos.validation;

import com.example.gestiGastillos.infra.exceptions.InvalidCreditLimitException;
import com.example.gestiGastillos.infra.exceptions.InvalidExpirationDateException;
import com.example.gestiGastillos.util.DateConverter;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

public class ExpirationDate {
    public static void expirationDateValidator(String userExpirationDate){
        LocalDate expirationDate = DateConverter.dateConverter(userExpirationDate);

        if(expirationDate.isBefore(LocalDate.now()) || expirationDate.equals(LocalDate.now())){
            throw new InvalidExpirationDateException("La fecha ingresada no puede ser el dia en curso, ni dias previos: " + expirationDate);
        }
    }
}
