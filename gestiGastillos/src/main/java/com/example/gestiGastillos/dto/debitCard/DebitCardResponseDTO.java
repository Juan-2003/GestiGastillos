package com.example.gestiGastillos.dto.debitCard;

import com.example.gestiGastillos.dto.card.CardResponseDTO;
import com.example.gestiGastillos.dto.user.UserResponseDTO;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"tarjeta_debito_id", "user", "card", "current_balance"})
public record DebitCardResponseDTO(
        @JsonProperty("tarjeta_debito_id")
        Long debitCardId,
        @JsonProperty("user")
        UserResponseDTO userResponseDTO,
        @JsonProperty("card")
        CardResponseDTO cardResponseDTO,
        @JsonProperty("current_balance")
        Double currentBalance
) {
    public DebitCardResponseDTO(DebitCard debitCard){
        this(
                debitCard.getId(),
                new UserResponseDTO(debitCard.getUser()),
                new CardResponseDTO(debitCard.getCard()),
                debitCard.getCurrentBalance()
        );
    }
}
