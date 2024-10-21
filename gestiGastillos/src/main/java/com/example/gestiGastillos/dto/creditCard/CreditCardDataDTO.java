package com.example.gestiGastillos.dto.creditCard;

import com.example.gestiGastillos.dto.card.CardDataDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreditCardDataDTO(
        @NotNull(message = "El user_id no puede ser nulo")
        Long user_id,
        @NotBlank(message = "El limite de credito no puede estar vacio")
        @JsonProperty("credit_limit")
        String creditLimit,
        @NotNull(message = "La deuda no puede ser nula")
        Double debt,
        @Valid
        @JsonProperty("card")
        CardDataDTO cardDataDTO
) {
}
