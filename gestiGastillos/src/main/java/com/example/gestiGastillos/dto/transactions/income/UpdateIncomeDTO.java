package com.example.gestiGastillos.dto.transactions.income;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record UpdateIncomeDTO(
        @JsonProperty("income_id")
        Long incomeId,

        @NotNull(message = "'cantidad' no puede estar vacia")
        @Positive(message = "'cantidad' debe ser mayor que 0")
        Double amount,

        @NotBlank(message = "'concepto' no puede estar vacio")
        @Size(max = 50, message = "El concepto no puede exceder los 50 caracteres")
        String concept
) {
}
