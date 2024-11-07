package com.example.gestiGastillos.dto.saving;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SavingDataDTO(
        @NotBlank(message = "'nombre' no puede estar vacio")
        String name,

        @JsonProperty("target_amount")
        Double targetAmount,
        @JsonProperty("debit_card_id")
        Long debitCardId
) {
}
