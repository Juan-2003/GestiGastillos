package com.example.gestiGastillos.model.creditCard.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidDebtException;
import org.springframework.stereotype.Component;

@Component
public class DebtPostValidator implements CreditCardPostValidator {
    @Override
    public void validation(CreditCardDataDTO creditCardDataDTO) {
        Double debt = creditCardDataDTO.debt();

        if(debt < 0){
            throw new InvalidDebtException("Deuda ingresada invalida: " + debt);
        }
    }
}
