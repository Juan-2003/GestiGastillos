package com.example.gestiGastillos.validation.Cards.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidLastDigitsException;
import com.example.gestiGastillos.validation.LastDigits;
import com.example.gestiGastillos.validation.Validator;
import org.springframework.stereotype.Component;

@Component
public class LastDigitsPostValidator implements Validator<CreditCardDataDTO> {
    @Override
    public void validation(CreditCardDataDTO creditCardDataDTO) {
        LastDigits.lastDigitsValidator(creditCardDataDTO.cardDataDTO().lastDigits());
    }
}
