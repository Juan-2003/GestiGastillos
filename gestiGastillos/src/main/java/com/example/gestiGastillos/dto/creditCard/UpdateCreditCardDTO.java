package com.example.gestiGastillos.dto.creditCard;

import com.example.gestiGastillos.dto.card.UpdateCardDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record UpdateCreditCardDTO(
        @NotNull(message = "'credit_card_id' no puede ser nulo")
        @JsonProperty("credit_card_id")
        Long creditCardId,
        @NotBlank(message = "'credit_limit' no puede estar vacio")
        @JsonProperty("credit_limit")
        String creditLimit,
        @NotNull(message = "'debt' no puede ser nulo")
        Double debt,
        @Valid
        @JsonProperty("card")
        UpdateCardDTO updateCardDTO
) {
}
