package com.example.gestiGastillos.dto.card;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public record CardDataDTO(
        @NotBlank
        String name,
        @NotBlank
        @JsonProperty("last_digits")
        String lastDigits,
        @NotBlank
        @JsonProperty("expiration_date")
        String expirationDate
) {

}
