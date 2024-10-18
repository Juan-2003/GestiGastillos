package com.example.gestiGastillos.model.creditCard.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.util.DateConverter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class ExpirationDateValidator implements CreditCardPostValidator {

    @Override
    public void validation(CreditCardDataDTO creditCardDataDTO) {
        if(creditCardDataDTO.user_id() == null){
            return;
        }

        LocalDate expirationDate = DateConverter.dateConverter(creditCardDataDTO.cardDataDTO().expirationDate());

        if(expirationDate.isBefore(LocalDate.now()) || expirationDate.equals(LocalDate.now())){
            throw new RuntimeException("La fecha es invalida");
        }
    }
}
