package com.example.gestiGastillos.validation.Cards.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.dto.debitCard.DebitCardDataDTO;
import com.example.gestiGastillos.dto.debitCard.UpdateDebitCardDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCardNameException;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.example.gestiGastillos.validation.CardName;
import com.example.gestiGastillos.validation.Validator;
import com.example.gestiGastillos.repository.UserRepository;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/*
    2. Como puedes ver, en donde se declara la clase se implementa la interfaz "Validator" y
    se le especifica la clase que va a recibir, en este caso "CreditCardDataDTO".

    Ahora vamos al archivo de NamePutValidator en la carpeta de PutValidations
 */
@Component
public class NamePostValidator implements Validator<Object> {
    private final UserRepository userRepository;

    @Autowired
    public NamePostValidator(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @Override
    public void validation(CreditCardDataDTO creditCardDataDTO) {
        User user = userRepository.getReferenceById(creditCardDataDTO.user_id());
        CardName.cardNameValidation(creditCardDataDTO.cardDataDTO().name(), user);
    }

    @Override
    public void validation(Object dto) {
        User user = null;
        String newCreditCardName = "";
        if(dto instanceof CreditCardDataDTO){
            CreditCardDataDTO creditCardDataDTO = (CreditCardDataDTO) dto;
            user = userRepository.getReferenceById(creditCardDataDTO.user_id());
            newCreditCardName = creditCardDataDTO.cardDataDTO().name();
        }
        else if(dto instanceof UpdateCreditCardDTO){
            UpdateCreditCardDTO updateCreditCardDTO = (UpdateCreditCardDTO) dto;
            userRepository.getReferenceById(updateCreditCardDTO.userId());
            newCreditCardName = updateCreditCardDTO.updateCardDTO().name();
        }
        else if(dto instanceof DebitCardDataDTO){
            DebitCardDataDTO debitCardDataDTO = (DebitCardDataDTO) dto;
            userRepository.getReferenceById(debitCardDataDTO.user_id());
            newCreditCardName = debitCardDataDTO.cardDataDTO().name();
        }

        if(user != null){
            CardName.cardNameValidation(newCreditCardName, user);
        }
    }
}
