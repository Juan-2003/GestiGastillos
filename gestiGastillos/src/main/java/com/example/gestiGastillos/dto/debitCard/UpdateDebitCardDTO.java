package com.example.gestiGastillos.dto.debitCard;

import com.example.gestiGastillos.dto.card.UpdateCardDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record UpdateDebitCardDTO(
        @NotNull(message = "'debit_card_id' no puede ser nulo")
        @JsonProperty("debit_card_id")
        Long debitCardId,
        @NotBlank
        @PositiveOrZero(message = "'current_balance' debe ser mayor o igual a 0")
        @JsonProperty("current_balance")
        Double currentBalance,
        @Valid
        @JsonProperty("card")
        UpdateCardDTO updateCardDTO
) {
}
