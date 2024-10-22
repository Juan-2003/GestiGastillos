package com.example.gestiGastillos.model.debitCard.PutValidation;

import com.example.gestiGastillos.dto.debitCard.UpdateDebitCardDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCardNameException;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.example.gestiGastillos.repository.DebitCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DebitNamePutValidator implements DebitCardPutValidator {
    private final DebitCardRepository debitCardRepository;

    @Autowired
    public DebitNamePutValidator(DebitCardRepository debitCardRepository){
        this.debitCardRepository = debitCardRepository;
    }

    @Override
    public void validation(UpdateDebitCardDTO updateDebitCardDTO) {
        String newDebitCardName = updateDebitCardDTO.updateCardDTO().name();
        DebitCard debitCard = debitCardRepository.findById(updateDebitCardDTO.debitCardId())
                .orElseThrow(()-> new RuntimeException("La tarjeta no existe"));

        User user = debitCard.getUser();
        List<DebitCard> debitCardList = user.getDebitCards();

        boolean flag =  debitCardList.stream()
                .anyMatch(c -> c.getCard().getName().equals(newDebitCardName));

        if(flag){
            throw new InvalidCardNameException("Ya existe una tarjeta de debito con el nombre: " + newDebitCardName);
        }

    }
}
