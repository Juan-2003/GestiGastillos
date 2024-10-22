package com.example.gestiGastillos.model.creditCard.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCardNameException;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.validation.CardName;
import com.example.gestiGastillos.validation.Validator;
import com.example.gestiGastillos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/*
    2. Como puedes ver, en donde se declara la clase se implementa la interfaz "Validator" y
    se le especifica la clase que va a recibir, en este caso "CreditCardDataDTO".

    Ahora vamos al archivo de NamePutValidator en la carpeta de PutValidations
 */
@Component
public class NamePostValidator implements Validator<CreditCardDataDTO> {
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
}
