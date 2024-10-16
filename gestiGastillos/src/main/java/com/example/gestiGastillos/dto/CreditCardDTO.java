package com.example.gestiGastillos.dto;

import com.example.gestiGastillos.model.CreditCard;

public record CreditCardDTO(
        CardDTO cardDTO,
        String creditLimit,         //Limite de credito
        Double debt
) {
    public CreditCardDTO(CreditCard creditCard){
        this(new CardDTO(creditCard.getCard()), creditCard.getCreditLimit(), creditCard.getDebt());
    }
}
