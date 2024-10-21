package com.example.gestiGastillos.dto.debitCard;

import com.example.gestiGastillos.dto.card.CardDataDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DebitCardDataDTO(
        @NotNull
        Long user_id,
        @NotBlank
        @JsonProperty("current_balance")
        Double currentBalance,
        @JsonProperty("card")
        CardDataDTO cardDataDTO
) {
}
