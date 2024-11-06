package com.example.gestiGastillos.dto.saving;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

public record SavingDataDTO(
        String name,

        @JsonProperty("target_amount")
        Double targetAmount,
        @JsonProperty("debit_card_id")
        Long debitCardId
) {
}
