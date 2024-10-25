package com.example.gestiGastillos.dto.transactions.income;

import com.example.gestiGastillos.model.transactions.Transactions;
import com.fasterxml.jackson.annotation.JsonProperty;

public record UpdateIncomeResponseDTO(
        @JsonProperty("icome_id")
        Long incomeId,
        String type,
        Double amount,
        String concept,
        String category,
        @JsonProperty("payment_method")
        String paymentMethod
) {
    public UpdateIncomeResponseDTO(Transactions transaction){
        this(
                transaction.getId(),
                transaction.getType().name(),
                transaction.getAmount(),
                transaction.getConcept(),
                transaction.getCategory().name(),
                transaction.getPaymentMethod().name()
        );
    }
}
