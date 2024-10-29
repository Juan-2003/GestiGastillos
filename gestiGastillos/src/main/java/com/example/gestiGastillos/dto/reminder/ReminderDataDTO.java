package com.example.gestiGastillos.dto.reminder;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public record ReminderDataDTO(
        @NotBlank
        String name,

        @NotBlank
        String message,

        @NotBlank
        String date,

        @JsonProperty("credit_card_id")
        Long creditCardId,

        @JsonProperty("debit_card_id")
        Long debitCardId
) {
}
