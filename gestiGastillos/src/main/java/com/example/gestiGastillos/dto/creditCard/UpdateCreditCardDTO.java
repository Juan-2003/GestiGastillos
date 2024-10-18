package com.example.gestiGastillos.dto.creditCard;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateCreditCardDTO(
        @NotNull
        @JsonProperty("credit_card_id")
        Long creditCardId,
        @NotBlank
        String name,
        @NotBlank
        @JsonProperty("credit_limit")
        String creditLimit,
        @NotNull
        Double debt
) {
}
