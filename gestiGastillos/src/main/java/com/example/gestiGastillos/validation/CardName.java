package com.example.gestiGastillos.validation;

import com.example.gestiGastillos.infra.exceptions.InvalidCardNameException;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.creditCard.CreditCard;

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

    public static void cardNameValidation(String newCreditCardName, User user) {
        List<CreditCard> creditCardList = user.getCreditCards();

        boolean flag =  creditCardList.stream()
                .anyMatch(c -> c.getCard().getName().equals(newCreditCardName));

        if(flag){
            throw new InvalidCardNameException("Ya existe una tarjeta de credito con el nombre: " + newCreditCardName);
        }

    }
}
