package com.example.gestiGastillos.validation.Cards.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.dto.debitCard.DebitCardDataDTO;
import com.example.gestiGastillos.dto.debitCard.UpdateDebitCardDTO;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.validation.CardName;
import com.example.gestiGastillos.validation.Cards.CardValidator;
import com.example.gestiGastillos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/*
    2. Como puedes ver, en donde se declara la clase se implementa la interfaz "Validator" y
    se le especifica la clase que va a recibir, en este caso "CreditCardDataDTO".

    Ahora vamos al archivo de NamePutValidator en la carpeta de PutValidations
 */
@Component
public class NamePostValidator implements CardValidator<Object> {
    private final UserRepository userRepository;

    @Autowired
    public NamePostValidator(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public void validation(Object dto) {
        User user = null;
        String newCardName = "";
        if(dto instanceof CreditCardDataDTO){
            CreditCardDataDTO creditCardDataDTO = (CreditCardDataDTO) dto;
            user = userRepository.getReferenceById(creditCardDataDTO.user_id());
            newCardName = creditCardDataDTO.cardDataDTO().name();
        }
        else if(dto instanceof UpdateCreditCardDTO){
            UpdateCreditCardDTO updateCreditCardDTO = (UpdateCreditCardDTO) dto;
            user = userRepository.getReferenceById(updateCreditCardDTO.userId());
            newCardName = updateCreditCardDTO.updateCardDTO().name();
        }
        else if(dto instanceof UpdateDebitCardDTO){
            UpdateDebitCardDTO updatedebitCardDTO = (UpdateDebitCardDTO) dto;
            user = userRepository.getReferenceById(updatedebitCardDTO.userId());
            newCardName = updatedebitCardDTO.updateCardDTO().name();
        }
        else if(dto instanceof DebitCardDataDTO){
            DebitCardDataDTO debitCardDataDTO = (DebitCardDataDTO) dto;
            user= userRepository.getReferenceById(debitCardDataDTO.user_id());
            newCardName = debitCardDataDTO.cardDataDTO().name();
        }

        if(user != null){
            CardName.cardNameValidation(newCardName, user, dto);
        }
    }
}
