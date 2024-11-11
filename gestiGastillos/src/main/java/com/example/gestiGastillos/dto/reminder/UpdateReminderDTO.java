package com.example.gestiGastillos.dto.reminder;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateReminderDTO(
        @JsonProperty("reminder_id")
        @NotNull(message = "El reminder_id no puede ser nulo")
        Long id,

        @NotBlank(message = "El nombre no puede estar vacio")
        String name,

        @NotBlank(message = "El mensaje no puede estar vacio")
        String message,

        @NotBlank(message = "La fecha no puede estar vacia")
        String date
) {
}
