package com.example.gestiGastillos.model.creditCard.PutValidations;

import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import org.springframework.stereotype.Component;

@Component
public class DebtValidatorr implements CreditCardPutValidator {
    @Override
    public void validation(UpdateCreditCardDTO updateCreditCardDTO) {
        if(updateCreditCardDTO.creditCardId() == null){
            return;
        }

        if(updateCreditCardDTO.debt() < 0){
            throw new RuntimeException("Deuda invalida");
        }
    }
}
