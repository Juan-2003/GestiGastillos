package com.example.gestiGastillos.dto.creditCard;

import com.example.gestiGastillos.dto.card.CardDataDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreditCardDataDTO(
        @NotNull
        Long user_id,
        @NotBlank
        @JsonProperty("credit_limit")
        String creditLimit,
        @NotNull
        Double debt,
        @JsonProperty("card")
        CardDataDTO cardDataDTO
) {
}
