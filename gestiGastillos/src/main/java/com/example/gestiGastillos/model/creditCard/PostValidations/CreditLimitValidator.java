package com.example.gestiGastillos.model.creditCard.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CreditLimitValidator implements CreditCardPostValidator {
    private final CreditCardRepository creditCardRepository;

    @Autowired
    public CreditLimitValidator(CreditCardRepository creditCardRepository){
        this.creditCardRepository = creditCardRepository;
    }

    @Override
    public void validation(CreditCardDataDTO creditCardDataDTO) {
        if(creditCardDataDTO.user_id() == null){
            return;
        }

        if(Integer.parseInt(creditCardDataDTO.creditLimit()) <= 0){
            throw new RuntimeException("Limite de credito invalido");
        }
    }
}
