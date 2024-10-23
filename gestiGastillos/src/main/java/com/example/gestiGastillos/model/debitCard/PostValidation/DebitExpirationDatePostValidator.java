package com.example.gestiGastillos.model.debitCard.PostValidation;

import com.example.gestiGastillos.dto.debitCard.DebitCardDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCreditLimitException;
import com.example.gestiGastillos.util.DateConverter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DebitExpirationDatePostValidator implements DebitCardPostValidator {

    @Override
    public void validation(DebitCardDataDTO debitCardDataDTO) {
        LocalDate expirationDate = DateConverter.dateConverter(debitCardDataDTO.cardDataDTO().expirationDate());

        if(expirationDate.isBefore(LocalDate.now()) || expirationDate.equals(LocalDate.now())){
            throw new InvalidCreditLimitException("La fecha ingresada no puede ser el dia en curso, ni dias previos: " + expirationDate);
        }
    }
}
