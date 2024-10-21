package com.example.gestiGastillos.model.creditCard.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCreditLimitException;
import com.example.gestiGastillos.util.DateConverter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class ExpirationDatePostValidator implements CreditCardPostValidator {

    @Override
    public void validation(CreditCardDataDTO creditCardDataDTO) {
        LocalDate expirationDate = DateConverter.dateConverter(creditCardDataDTO.cardDataDTO().expirationDate());

        if(expirationDate.isBefore(LocalDate.now()) || expirationDate.equals(LocalDate.now())){
            throw new InvalidCreditLimitException("La fecha ingresada no puede ser el dia en curso, ni dias previos: " + expirationDate);
        }
    }
}
