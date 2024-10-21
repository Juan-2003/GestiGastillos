package com.example.gestiGastillos.model.creditCard.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCardNameException;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.repository.CreditCardRepository;
import com.example.gestiGastillos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NamePostValidator implements CreditCardPostValidator {
    private final CreditCardRepository creditCardRepository;
    private final UserRepository userRepository;

    @Autowired
    public NamePostValidator(CreditCardRepository creditCardRepository, UserRepository userRepository){
        this.creditCardRepository = creditCardRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void validation(CreditCardDataDTO creditCardDataDTO) {
        String newCreditCardName = creditCardDataDTO.cardDataDTO().name();

        User user = userRepository.getReferenceById(creditCardDataDTO.user_id());
        List<CreditCard> creditCardList = user.getCreditCards();

        boolean flag =  creditCardList.stream()
                .anyMatch(c -> c.getCard().getName().equals(newCreditCardName));

        if(flag){
            throw new InvalidCardNameException("Ya existe una tarjeta de credito con el nombre: " + newCreditCardName);
        }
    }
}
