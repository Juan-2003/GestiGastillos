package com.example.gestiGastillos.dto.saving;

import com.example.gestiGastillos.model.Saving;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.constraints.NotNull;

@JsonPropertyOrder({"name", "saving_id", "target_amount", "status", "debit_card_id"})
public record UpdateSavingResponseDTO(

        @JsonProperty("saving_id")
        Long savingId,
        String name,

        @NotNull
        @JsonProperty("target_amount")
        Double targetAmount,


        @NotNull
        @JsonProperty("debit_card_id")
        Long debitCardId
) {
    public UpdateSavingResponseDTO(Saving saving){
        this(
                saving.getId(),
                saving.getName(),
                saving.getTargetAmount(),
                saving.getCard().getDebitCard().getId()
        );
    }
}
