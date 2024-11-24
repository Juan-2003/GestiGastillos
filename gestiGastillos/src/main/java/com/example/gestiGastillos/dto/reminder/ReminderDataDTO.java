package com.example.gestiGastillos.dto.reminder;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ReminderDataDTO(
        @JsonProperty("user_id")
        @NotNull(message = "'user_id' no puede ser nulo")
        Long userId,

        @NotBlank(message = "No puede estar vacio el nombre")
        String name,

        @NotBlank(message = "No puede estar vacio el mensaje")
        String message,

        @NotBlank(message = "La fecha no puede estar vacia")
        String date,


        @JsonProperty("credit_card_id")
        Long creditCardId,

        @JsonProperty("debit_card_id")
        Long debitCardId
) {
}
