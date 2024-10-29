package com.example.gestiGastillos.dto.reminder;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateReminderDTO(
        @JsonProperty("reminder_id")
        @NotNull
        Long id,

        @NotBlank
        String name,

        @NotBlank
        String message,

        @NotBlank
        String date,

        @JsonProperty("card_id")
        Long cardId
) {
}
