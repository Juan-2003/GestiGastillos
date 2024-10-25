package com.example.gestiGastillos.dto.debitCard;

import com.example.gestiGastillos.dto.card.CardDataDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record DebitCardDataDTO(
        @NotNull(message = "El user_id no puede ser nulo")
        Long user_id,
        @NotNull
        @PositiveOrZero(message = "La cantidad del currente_balance debe ser mayor o igual 0")
        @JsonProperty("current_balance")
        Double currentBalance,
        @Valid
        @JsonProperty("card")
        CardDataDTO cardDataDTO
) {
}
