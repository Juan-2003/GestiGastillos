package com.example.gestiGastillos.dto.transactions.income;

import com.example.gestiGastillos.model.transactions.Transactions;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"income_id", "title", "type", "amount", "concept", "category", "date", "payment_method"})
public record UpdateIncomeResponseDTO(
        @JsonProperty("icome_id")
        Long incomeId,
        String title,
        String type,
        Double amount,
        String concept,
        String category,
        String date,
        @JsonProperty("payment_method")
        String paymentMethod
) {
    public UpdateIncomeResponseDTO(Transactions transaction){
        this(
                transaction.getId(),
                transaction.getTitle(),
                transaction.getType().name(),
                transaction.getAmount(),
                transaction.getConcept(),
                transaction.getCategory().name(),
                transaction.getDate(),
                transaction.getPaymentMethod().name()
        );
    }
}
