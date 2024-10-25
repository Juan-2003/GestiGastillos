package com.example.gestiGastillos.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class DateConverter {
    public static LocalDate dateConverter(String date){
        if(date == null){
            throw new IllegalArgumentException("La fecha no puede estar vacia");
        }

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        try{
            return LocalDate.parse(date, dateTimeFormatter);
        }catch (DateTimeParseException e){
            throw new RuntimeException("El formato de la fecha es incorrecto ");
        }

    }
}
