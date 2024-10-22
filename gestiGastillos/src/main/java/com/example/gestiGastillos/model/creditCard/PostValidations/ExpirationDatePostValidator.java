package com.example.gestiGastillos.model.creditCard.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCreditLimitException;
import com.example.gestiGastillos.validation.ExpirationDate;
import com.example.gestiGastillos.validation.Validator;
import com.example.gestiGastillos.util.DateConverter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;


@Component
public class ExpirationDatePostValidator implements Validator<CreditCardDataDTO> {
    @Override
    public void validation(CreditCardDataDTO creditCardDataDTO) {
        ExpirationDate.expirationDateValidator(creditCardDataDTO.cardDataDTO().expirationDate());
    }
}