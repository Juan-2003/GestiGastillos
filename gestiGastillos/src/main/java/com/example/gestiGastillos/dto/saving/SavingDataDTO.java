package com.example.gestiGastillos.dto.saving;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record SavingDataDTO(
        @JsonProperty("user_id")
        @NotNull(message = "'user_id' no puede ser nulo")
        Long userId,

        @NotBlank(message = "'nombre' no puede estar vacio")
        String name,

        @Positive(message = "El target_amount debe ser mayor a 0")
        @NotNull(message = "el target amount no debe estar en blanco")
        @JsonProperty("target_amount")
        Double targetAmount,

        @NotNull(message = "No puede ser nulo el ID de la tarjeta")
        @JsonProperty("debit_card_id")
        Long debitCardId
) {
}
