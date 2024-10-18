package com.example.gestiGastillos.model.creditCard.PutValidations;

import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CreditLimitValidatorr implements CreditCardPutValidator {
    private final CreditCardRepository creditCardRepository;

    @Autowired
    public CreditLimitValidatorr(CreditCardRepository creditCardRepository){
        this.creditCardRepository = creditCardRepository;
    }

    @Override
    public void validation(UpdateCreditCardDTO updateCreditCardDTO) {
        if(updateCreditCardDTO.creditCardId() == null){
            return;
        }

        if(Integer.parseInt(updateCreditCardDTO.creditLimit()) <= 0){
            throw new RuntimeException("Limite de credito invalido");
        }
    }
}
