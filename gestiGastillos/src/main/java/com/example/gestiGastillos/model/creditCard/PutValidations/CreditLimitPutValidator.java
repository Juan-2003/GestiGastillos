package com.example.gestiGastillos.model.creditCard.PutValidations;

import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCreditLimitException;
import com.example.gestiGastillos.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CreditLimitPutValidator implements CreditCardPutValidator {
    private final CreditCardRepository creditCardRepository;

    @Autowired
    public CreditLimitPutValidator(CreditCardRepository creditCardRepository){
        this.creditCardRepository = creditCardRepository;
    }

    @Override
    public void validation(UpdateCreditCardDTO updateCreditCardDTO) {
        int creditLimit = Integer.parseInt(updateCreditCardDTO.creditLimit());

        if(creditLimit <= 0){
            throw new InvalidCreditLimitException("Limite de credito invalido: " + creditLimit);
        }
    }
}
