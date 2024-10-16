package com.example.gestiGastillos.dto;

import com.example.gestiGastillos.model.DebitCard;

public record DebitCardDTO(
        CardDTO cardDTO,
        Double currentBalance
) {
    public DebitCardDTO(DebitCard debitCard){
        this(new CardDTO(debitCard.getCard()), debitCard.getCurrentBalance());
    }
}
