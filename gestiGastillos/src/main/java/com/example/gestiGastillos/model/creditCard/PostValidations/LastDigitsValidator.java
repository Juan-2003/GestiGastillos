package com.example.gestiGastillos.model.creditCard.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import org.springframework.stereotype.Component;

@Component
public class LastDigitsValidator implements CreditCardPostValidator {
    @Override
    public void validation(CreditCardDataDTO creditCardDataDTO) {
        if(creditCardDataDTO.user_id() == null){
            return;
        }

        String lastDigits = creditCardDataDTO.cardDataDTO().lastDigits();
        if(lastDigits.length() != 4){
            throw new RuntimeException("Deben de ser 4 digitos");
        }
        if(!lastDigits.matches("\\d+")){
            throw new RuntimeException("Solo se aceptan números");

        }
    }
}
