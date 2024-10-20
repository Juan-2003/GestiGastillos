package com.example.gestiGastillos.dto.debitCard;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateDebitCardDTO(
        @NotNull
        @JsonProperty("debit_card_id")
        Long debitCardId,
        @NotBlank
        String name,
        @NotBlank
        @JsonProperty("current_balance")
        Double currentBalance
) {
}
