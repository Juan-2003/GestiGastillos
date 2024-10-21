package com.example.gestiGastillos.model.creditCard.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCreditLimitException;
import com.example.gestiGastillos.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CreditLimitPostValidator implements CreditCardPostValidator {
    private final CreditCardRepository creditCardRepository;

    @Autowired
    public CreditLimitPostValidator(CreditCardRepository creditCardRepository){
        this.creditCardRepository = creditCardRepository;
    }

    @Override
    public void validation(CreditCardDataDTO creditCardDataDTO) {
        int creditLimit = Integer.parseInt(creditCardDataDTO.creditLimit());

        if(creditLimit <= 0){
            throw new InvalidCreditLimitException("Limite de credito invalido: " + creditLimit);
        }
    }
}
