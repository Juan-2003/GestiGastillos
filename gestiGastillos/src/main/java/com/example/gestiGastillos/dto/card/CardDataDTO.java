package com.example.gestiGastillos.dto.card;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CardDataDTO(
        @NotBlank(message = "'name' no puede estar vacio")
        @Pattern(regexp = "^[A-Za-z]+([A-Za-z0-9]*)( [A-Za-z0-9]+)*$", message = "El nombre solo puede contener letras mayúsculas y minúsculas, sin espacios ni caracteres especiales.")
        String name,

        @NotBlank(message = "'last_digits' no puede estar vacio")
        @JsonProperty("last_digits")
        String lastDigits,

        @NotBlank(message = "'expiration_date' no puede estar vacio")
        @JsonProperty("expiration_date")
        String expirationDate
) {

}
