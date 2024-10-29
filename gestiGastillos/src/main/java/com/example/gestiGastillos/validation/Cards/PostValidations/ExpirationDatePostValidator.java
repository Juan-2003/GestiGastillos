package com.example.gestiGastillos.validation.Cards.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.dto.debitCard.DebitCardDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCreditLimitException;
import com.example.gestiGastillos.validation.ExpirationDate;
import com.example.gestiGastillos.validation.Validator;
import com.example.gestiGastillos.util.DateConverter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;


@Component
public class ExpirationDatePostValidator implements Validator<Object> {
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