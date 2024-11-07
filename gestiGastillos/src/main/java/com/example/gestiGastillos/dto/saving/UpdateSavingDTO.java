package com.example.gestiGastillos.dto.saving;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateSavingDTO(
        @NotNull(message = "'saving_id' no puede estar vacio")
        @JsonProperty("saving_id")
        Long savingId,

        @NotBlank(message = "'nombre' no puede estar vacio")
        String name,

        @NotNull(message = "'objetivo' no puede estar vacio")
        @JsonProperty("target_amount")
        Double targetAmount
) {
}
