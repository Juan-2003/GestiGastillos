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

/*
    5. Es una clase normal la cual simplemente tiene la logica de la validacion, solo es que pide
    los elementos necesarios para realizarla. Esto ahorra que aqui tengamos que llamar a un repositorio
    para comunicarte con la Base de datos.
    Lo unico que no me gusta es que se hacen mas clases, pero por otro lado, podemos llamar a esta logica en
    donde queramos, como en las validaciones de la tarjeta de credito.

    Vamos a CreditCardService
 */
public class CardName {

    public static void cardNameValidation(String newCardName, User user, Object dto) {

        boolean flag = false;
        if(dto instanceof CreditCardDataDTO || dto instanceof UpdateCreditCardDTO) {
            List<CreditCard> creditCardList = user.getCreditCards();
            System.out.println();
            System.out.println("Si entre al CARDNAME DE LA VERIFICACION DEL NOMBRE");
            flag=  creditCardList.stream()
                    .anyMatch(c -> c.getCard().getName().equals(newCardName));
        }
        else if(dto instanceof DebitCardDataDTO || dto instanceof UpdateDebitCardDTO) {
            List<DebitCard> debitCardList = user.getDebitCards();
            System.out.println();
            System.out.println("Si entre al CARDNAME DE LA VERIFICACION DEL NOMBRE");
            flag=  debitCardList.stream()
                    .anyMatch(c -> c.getCard().getName().equals(newCardName));
        }
        if(flag){
            throw new InvalidCardNameException("Ya existe una tarjeta de credito con el nombre: " + newCardName);
        }

    }
}
