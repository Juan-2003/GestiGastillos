package com.example.gestiGastillos.model.creditCard.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import org.springframework.stereotype.Component;

@Component
public class DebtValidator implements CreditCardPostValidator {
    @Override
    public void validation(CreditCardDataDTO creditCardDataDTO) {
        if(creditCardDataDTO.user_id() == null){
            return;
        }

        if(creditCardDataDTO.debt() < 0){
            throw new RuntimeException("Deuda invalida");
        }
    }
}
