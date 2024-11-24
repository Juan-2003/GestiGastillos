package com.example.gestiGastillos.validation;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.dto.debitCard.DebitCardDataDTO;
import com.example.gestiGastillos.dto.debitCard.UpdateDebitCardDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCardNameException;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.model.debitCard.DebitCard;

import java.util.List;

public class CardName {

    public static void cardNameValidation(String newCardName, User user, Object dto) {

        boolean flag = false;
        if(dto instanceof CreditCardDataDTO || dto instanceof UpdateCreditCardDTO) {
            List<CreditCard> creditCardList = user.getCreditCards();
            flag=  creditCardList.stream()
                    .anyMatch(c -> c.getCard().getName().equals(newCardName));
        }
        else if(dto instanceof DebitCardDataDTO || dto instanceof UpdateDebitCardDTO) {
            List<DebitCard> debitCardList = user.getDebitCards();
            flag=  debitCardList.stream()
                    .anyMatch(c -> c.getCard().getName().equals(newCardName));
        }
        if(flag){
            throw new InvalidCardNameException("Ya existe una tarjeta de credito con el nombre: " + newCardName);
        }

    }
}
