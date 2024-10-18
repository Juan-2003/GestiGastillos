package com.example.gestiGastillos.model.creditCard.PutValidations;

import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.repository.CreditCardRepository;
import com.example.gestiGastillos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NameValidatorr implements CreditCardPutValidator {
    private final CreditCardRepository creditCardRepository;
    private final UserRepository userRepository;

    @Autowired
    public NameValidatorr(CreditCardRepository creditCardRepository, UserRepository userRepository){
        this.creditCardRepository = creditCardRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void validation(UpdateCreditCardDTO updateCreditCardDTO) {
        if(updateCreditCardDTO.creditCardId() == null){
            return;
        }

        String newCreditCardName = updateCreditCardDTO.name();
        CreditCard creditCard = creditCardRepository.findById(updateCreditCardDTO.creditCardId())
                .orElseThrow(() -> new RuntimeException("La tarjeta no existe"));

        User user = creditCard.getUser();
        List<CreditCard> creditCardList = user.getCreditCards();

        boolean flag =  creditCardList.stream()
                .anyMatch(c -> c.getCard().getName().equals(newCreditCardName));

        if(flag){
            throw new RuntimeException("Ya existe una tarjeta de credito con ese nombre");
        }

    }
}
