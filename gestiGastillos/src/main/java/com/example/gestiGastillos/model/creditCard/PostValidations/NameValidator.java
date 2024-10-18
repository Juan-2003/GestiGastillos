package com.example.gestiGastillos.model.creditCard.PostValidations;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.repository.CreditCardRepository;
import com.example.gestiGastillos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NameValidator implements CreditCardPostValidator {
    private final CreditCardRepository creditCardRepository;
    private final UserRepository userRepository;

    @Autowired
    public NameValidator(CreditCardRepository creditCardRepository, UserRepository userRepository){
        this.creditCardRepository = creditCardRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void validation(CreditCardDataDTO creditCardDataDTO) {
        if(creditCardDataDTO.user_id() == null){
            return;
        }

        String newCreditCardName = creditCardDataDTO.cardDataDTO().name();
        User user = userRepository.findById(creditCardDataDTO.user_id())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        List<CreditCard> creditCardList = user.getCreditCards();

        boolean flag =  creditCardList.stream()
                .anyMatch(c -> c.getCard().getName().equals(newCreditCardName));

        if(flag){
            throw new RuntimeException("Ya existe una tarjeta de credito con ese nombre");
        }
        throw new RuntimeException("jhsjkvhvsjvvjfnvnsndfkj");

    }
}
