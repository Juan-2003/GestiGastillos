package com.example.gestiGastillos.dto.transactions.income;

import com.example.gestiGastillos.model.transactions.Transactions;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.util.List;

@JsonPropertyOrder({"transaction_id", "type", "amount", "concept", "category", "paymentMethod", "debit_card_id"})
public record IncomeResponseDTO(
        @JsonProperty("transaction_id")
        Long transactionId,
        String type,
        Double amount,
        String concept,
        String category,
        @JsonProperty("payment_method")
        String paymentMethod,
        @JsonProperty("debit_card_id")
        Long debitCardId
) {
        public IncomeResponseDTO(Transactions transaction) {
                this(
                        transaction.getId(),
                        transaction.getType().name(),
                        transaction.getAmount(),
                        transaction.getConcept(),
                        transaction.getCategory().name(),
                        transaction.getPaymentMethod().name(),
                        (transaction.getCard().getDebitCard() != null) ? transaction.getCard().getDebitCard().getId() : null
                );
        }
}