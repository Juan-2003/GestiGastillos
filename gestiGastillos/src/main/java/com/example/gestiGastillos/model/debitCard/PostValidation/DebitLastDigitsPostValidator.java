package com.example.gestiGastillos.model.debitCard.PostValidation;

import com.example.gestiGastillos.dto.debitCard.DebitCardDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidLastDigitsException;
import org.springframework.stereotype.Component;

@Component
public class DebitLastDigitsPostValidator implements DebitCardPostValidator {
    @Override
    public void validation(DebitCardDataDTO debitCardDataDTO) {
        String lastDigits = debitCardDataDTO.cardDataDTO().lastDigits();

        if(lastDigits.length() != 4){
            throw new InvalidLastDigitsException("Deben de ser 4 digitos");
        }
        if(!lastDigits.matches("\\d+")){
            throw new InvalidLastDigitsException("Solo se aceptan números: " + lastDigits);

        }
    }
}
