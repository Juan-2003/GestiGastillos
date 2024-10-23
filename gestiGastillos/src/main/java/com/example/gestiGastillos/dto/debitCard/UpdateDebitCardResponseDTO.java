package com.example.gestiGastillos.dto.debitCard;

import com.example.gestiGastillos.dto.card.UpdateCardResponseDTO;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.fasterxml.jackson.annotation.JsonProperty;

public record UpdateDebitCardResponseDTO(
        @JsonProperty("debit_card_id")
        Long debitCard_id,
        @JsonProperty("card")
        UpdateCardResponseDTO updateCardResponseDTO,
        @JsonProperty("current_balance")
        Double currentBalance
) {
    public UpdateDebitCardResponseDTO(DebitCard debitCard){
        this(debitCard.getId(),new UpdateCardResponseDTO(debitCard.getCard().getName()),debitCard.getCurrentBalance());
    }
}
