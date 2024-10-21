package com.example.gestiGastillos.dto.debitCard;

import com.example.gestiGastillos.model.debitCard.DebitCard;

public record UpdateDebitCardResponseDTO(
        Long debitCard_id,
        String name,
        Double currentBalance
) {
    public UpdateDebitCardResponseDTO(DebitCard debitCard){
        this(debitCard.getId(),debitCard.getCard().getName(),debitCard.getCurrentBalance());
    }
}
