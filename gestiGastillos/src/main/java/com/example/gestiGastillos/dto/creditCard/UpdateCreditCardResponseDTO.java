package com.example.gestiGastillos.dto.creditCard;

import com.example.gestiGastillos.model.creditCard.CreditCard;

public record UpdateCreditCardResponseDTO(
        Long creditCard_id,
        String name,
        String creditLimit,
        Double debt
) {
    public UpdateCreditCardResponseDTO(CreditCard creditCard){
        this(creditCard.getId(),creditCard.getCard().getName(),creditCard.getCreditLimit(),creditCard.getDebt());
    }
}
