package com.example.gestiGastillos.dto.card;

import com.example.gestiGastillos.model.card.Card;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

//Este DTO sirve como respuesta hacia los request de card
@JsonPropertyOrder({"card_id", "card_name", "last_digits", "expiration_date"})//Especifica el orden en que apareceran en el JSON
public record CardResponseDTO(
        @JsonProperty("card_id")//Especifica el nombre distinto que tendra en el JSON
        Long id,
        @JsonProperty("card_name")
        String cardName,
        @JsonProperty("last_digits")
        String lastDigits,
        @JsonProperty("expiration_date")
        String expirationDate
) {
    public CardResponseDTO(Card card){
        this(card.getId(), card.getName(), card.getLastDigits(), card.getExpirationDate());
    }
}
