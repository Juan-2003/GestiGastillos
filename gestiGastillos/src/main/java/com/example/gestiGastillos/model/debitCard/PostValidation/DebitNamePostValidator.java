package com.example.gestiGastillos.model.debitCard.PostValidation;

import com.example.gestiGastillos.dto.debitCard.DebitCardDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCardNameException;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.example.gestiGastillos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DebitNamePostValidator implements DebitCardPostValidator{
    private final UserRepository userRepository;

    @Autowired
    public DebitNamePostValidator(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public void validation(DebitCardDataDTO debitCardDataDTO) {
        String newDebitCardName = debitCardDataDTO.cardDataDTO().name();

        User user = userRepository.getReferenceById(debitCardDataDTO.user_id());
        List<DebitCard> debitCardList = user.getDebitCards();

        boolean flag =  debitCardList.stream()
                .anyMatch(c -> c.getCard().getName().equals(newDebitCardName));

        if(flag){
            throw new InvalidCardNameException("Ya existe una tarjeta de debito con el nombre: " + newDebitCardName);
        }
    }
}
