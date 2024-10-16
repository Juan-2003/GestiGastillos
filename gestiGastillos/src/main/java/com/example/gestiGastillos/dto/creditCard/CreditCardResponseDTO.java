package com.example.gestiGastillos.dto.creditCard;

import com.example.gestiGastillos.dto.card.CardResponseDTO;
import com.example.gestiGastillos.dto.user.UserResponseDTO;
import com.example.gestiGastillos.model.CreditCard;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

//Este DTO sirve como respuesta hacia los request de la tarjeta de credito

@JsonPropertyOrder({"tarjeta_credito_id", "user", "card", "debt", "credit_limit"})//Especifica el orden en que apareceran en el JSON
public record CreditCardResponseDTO(
        @JsonProperty("tarjeta_credito_id")//Especifica el nombre distinto que tendra en el JSON
        Long creditCardId,
        @JsonProperty("user")
        UserResponseDTO userResponseDTO,
        @JsonProperty("card")
        CardResponseDTO cardResponseDTO,
        Double debt,
        @JsonProperty("credit_limit")
        String creditLimit

) {
    public CreditCardResponseDTO(CreditCard creditCard){
        this(
                creditCard.getId(),
                new UserResponseDTO(creditCard.getUser()),
                new CardResponseDTO(creditCard.getCard()),
                creditCard.getDebt(),
                creditCard.getCreditLimit()
        );
    }
}
