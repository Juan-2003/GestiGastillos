package com.example.gestiGastillos.dto;

import com.example.gestiGastillos.model.Card;

public record CardDTO(
        String name,
        String lastDigits,
        String expirationDate
) {
    public CardDTO(Card card){
        this(card.getName(), card.getLastDigits(), card.getExpirationDate());
    }
}
