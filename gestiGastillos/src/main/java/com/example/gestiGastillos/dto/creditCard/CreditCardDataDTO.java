package com.example.gestiGastillos.dto.creditCard;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreditCardDataDTO(
        @NotNull
        Long user_id,
        @NotBlank
        String name,
        @NotBlank
        String lastDigits,
        @NotBlank
        String expirationDate,
        @NotBlank
        String creditLimit,
        @NotNull
        Double debt
) {
}
