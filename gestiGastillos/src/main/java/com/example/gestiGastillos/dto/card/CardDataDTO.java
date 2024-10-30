package com.example.gestiGastillos.dto.card;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public record CardDataDTO(
        @NotBlank(message = "'name' no puede estar vacio")
        String name,

        @NotBlank(message = "'last_digits' no puede estar vacio")
        @JsonProperty("last_digits")
        String lastDigits,

        @NotBlank(message = "'expiration_date' no puede estar vacio")
        @JsonProperty("expiration_date")
        String expirationDate
) {

}
