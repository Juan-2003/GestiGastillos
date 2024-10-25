package com.example.gestiGastillos.dto.creditCard;

import com.example.gestiGastillos.dto.card.UpdateCardDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;


public record UpdateCreditCardDTO(
        @NotNull(message = "'credit_card_id' no puede ser nulo")
        @JsonProperty("credit_card_id")
        Long creditCardId,

        @NotNull(message = "El user_id no puede ser nulo")
        Long userId,

        @NotBlank(message = "'credit_limit' no puede estar vacio")
        @Positive(message = "El limite de credito debe ser positivo")
        @JsonProperty("credit_limit")
        String creditLimit,

        @NotNull(message = "'debt' no puede ser nulo")
        @PositiveOrZero(message = "La deuda no puede ser negativa")
        Double debt,

        @Valid
        @JsonProperty("card")
        UpdateCardDTO updateCardDTO
) {
}
