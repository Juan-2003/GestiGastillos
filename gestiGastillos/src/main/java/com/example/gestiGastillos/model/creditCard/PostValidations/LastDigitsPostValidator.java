package com.example.gestiGastillos.model.creditCard.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidLastDigitsException;
import org.springframework.stereotype.Component;

@Component
public class LastDigitsPostValidator implements CreditCardPostValidator {
    @Override
    public void validation(CreditCardDataDTO creditCardDataDTO) {
        String lastDigits = creditCardDataDTO.cardDataDTO().lastDigits();

        if(lastDigits.length() != 4){
            throw new InvalidLastDigitsException("Deben de ser 4 digitos");
        }
        if(!lastDigits.matches("\\d+")){
            throw new InvalidLastDigitsException("Solo se aceptan números: " + lastDigits);

        }
    }
}
