package com.example.gestiGastillos.dto.creditCard;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateCreditCardDTO(
        @NotNull
        Long creditCard_id,
        @NotBlank
        String name,
        @NotBlank
        String creditLimit,
        @NotNull
        Double debt
) {
}
