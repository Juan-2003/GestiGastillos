package com.example.gestiGastillos.model.creditCard.PutValidations;

import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidDebtException;
import org.springframework.stereotype.Component;

@Component
public class DebtPutValidator implements CreditCardPutValidator {
    @Override
    public void validation(UpdateCreditCardDTO updateCreditCardDTO) {
        Double debt = updateCreditCardDTO.debt();

        if(debt < 0){
            throw new InvalidDebtException("Deuda ingresada invalida: " + debt);
        }
    }
}
