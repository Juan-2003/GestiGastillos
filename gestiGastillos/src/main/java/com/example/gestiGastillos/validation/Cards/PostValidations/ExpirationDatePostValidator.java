package com.example.gestiGastillos.validation.Cards.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.dto.debitCard.DebitCardDataDTO;
import com.example.gestiGastillos.validation.ExpirationDate;
import com.example.gestiGastillos.validation.Cards.CardValidator;
import org.springframework.stereotype.Component;


@Component
public class ExpirationDatePostValidator implements CardValidator<Object> {
    @Override
    public void validation(Object dto) {
        String expirationDate = "";
        if(dto instanceof CreditCardDataDTO){
            CreditCardDataDTO creditCardDataDTO = (CreditCardDataDTO) dto;
            expirationDate = creditCardDataDTO.cardDataDTO().expirationDate();
        }
        else if(dto instanceof DebitCardDataDTO){
            DebitCardDataDTO debitCardDataDTO = (DebitCardDataDTO) dto;
            expirationDate = debitCardDataDTO.cardDataDTO().expirationDate();
        }
        if(!expirationDate.isBlank()){
            ExpirationDate.expirationDateValidator(expirationDate);
        }
    }
}