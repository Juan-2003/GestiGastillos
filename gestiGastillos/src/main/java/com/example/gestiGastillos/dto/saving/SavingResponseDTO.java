package com.example.gestiGastillos.dto.saving;

import com.example.gestiGastillos.model.Saving;
import com.example.gestiGastillos.util.SavingStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"name", "saving_id", "target_amount", "status", "debit_card_id"})
public record SavingResponseDTO(
        @JsonProperty("saving_id")
        Long savingId,
        String name,

        @JsonProperty("debit_card_name")
        String debitCardName,

        @JsonProperty("last_digits")
        String lastDigits,

        @JsonProperty("target_amount")
        Double targetAmount,

        String status,

        String current_balance,

        @JsonProperty("debit_card_id")
        Long debitCardId
) {
    public SavingResponseDTO(Saving saving){
        this(
                saving.getId(),
                saving.getName(),
                saving.getCard().getName(),
                saving.getCard().getLastDigits(),
                saving.getTargetAmount(),
                saving.getStatus().toString(),
                String.valueOf(saving.getCard().getDebitCard().getCurrentBalance()),
                saving.getCard().getDebitCard().getId()
        );
    }
}
