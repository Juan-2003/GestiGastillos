package com.example.gestiGastillos.validation;

import com.example.gestiGastillos.infra.exceptions.DateException;
import com.example.gestiGastillos.util.DateConverter;

import java.time.LocalDate;

public class PaymentDay {
    public static void paymentDay(String userPaymentDate){
        LocalDate paymentDate = DateConverter.dateConverter(userPaymentDate);
        if(paymentDate.isBefore(LocalDate.now())){
            throw new DateException("La fecha no puede ser anterior al dia de hoy");
        }
    }
}
