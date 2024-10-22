package com.example.gestiGastillos.dto.card;

import com.example.gestiGastillos.dto.creditCard.CreditCardResponseDTO;
import com.example.gestiGastillos.dto.debitCard.DebitCardResponseDTO;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record GetAllResponseDTO(
        @JsonProperty("credit_cards")
        List<CreditCardResponseDTO> creditCardResponseDTO,
        @JsonProperty("debit_cards")
        List<DebitCardResponseDTO> debitCardResponseDTO
) {
    public GetAllResponseDTO(List<CreditCardResponseDTO> creditCardResponseDTO, List<DebitCardResponseDTO> debitCardResponseDTO){
        this.creditCardResponseDTO = creditCardResponseDTO;
        this.debitCardResponseDTO = debitCardResponseDTO;
    }
}
