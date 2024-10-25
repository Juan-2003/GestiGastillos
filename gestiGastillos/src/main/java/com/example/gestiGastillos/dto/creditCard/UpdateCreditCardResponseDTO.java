package com.example.gestiGastillos.dto.creditCard;

import com.example.gestiGastillos.dto.card.UpdateCardResponseDTO;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"credit_card_id", "card", "credit_limit", "debt"})
public record UpdateCreditCardResponseDTO(
        @JsonProperty("credit_card_id")
        Long creditCardId,
        @JsonProperty("card")
        UpdateCardResponseDTO updateCardResponseDTO,
        @JsonProperty("credit_limit")
        String creditLimit,
        Double debt
) {
    public UpdateCreditCardResponseDTO(CreditCard creditCard){
        this(
                creditCard.getId(),
                new UpdateCardResponseDTO(creditCard.getCard().getName()),
                creditCard.getCreditLimit(),
                creditCard.getDebt());
    }
}
