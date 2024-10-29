package com.example.gestiGastillos.validation.Cards.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.dto.debitCard.DebitCardDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidLastDigitsException;
import com.example.gestiGastillos.repository.UserRepository;
import com.example.gestiGastillos.validation.LastDigits;
import com.example.gestiGastillos.validation.Validator;
import org.springframework.stereotype.Component;

@Component
public class LastDigitsPostValidator implements Validator<Object> {
    @Override
    public void validation(Object dto) {
        String lastDigits ="";
        if(dto instanceof CreditCardDataDTO){
            CreditCardDataDTO creditCardDataDTO = (CreditCardDataDTO) dto;
            lastDigits = creditCardDataDTO.cardDataDTO().lastDigits();
        }
        else if (dto instanceof DebitCardDataDTO){
            DebitCardDataDTO debitCardDataDTO = (DebitCardDataDTO) dto;
            lastDigits = debitCardDataDTO.cardDataDTO().lastDigits();
        }
        if (!lastDigits.isBlank()){
            LastDigits.lastDigitsValidator(lastDigits);
        }
    }
}
