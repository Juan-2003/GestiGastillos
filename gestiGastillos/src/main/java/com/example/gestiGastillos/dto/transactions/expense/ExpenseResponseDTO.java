package com.example.gestiGastillos.dto.transactions.expense;

import com.example.gestiGastillos.model.transactions.Transactions;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"transaction_id", "type", "amount", "concept", "category", "paymentMethod", "date", "debit_card_id", "credit_card_id"})
public record ExpenseResponseDTO(
        @JsonProperty("transaction_id")
        Long transactionId,
        String type,
        Double amount,
        String concept,
        String category,

        @JsonProperty("payment_method")
        String paymentMethod,

        String date,

        @JsonProperty("debit_card_id")
        Long debitCardId,

        @JsonProperty("credit_card_id")
        Long creditCardId
) {
    public ExpenseResponseDTO(Transactions transaction){
        this(
                transaction.getId(),
                transaction.getType().name(),
                transaction.getAmount(),
                transaction.getConcept(),
                transaction.getCategory().name(),
                transaction.getPaymentMethod().name(),
                transaction.getDate(),
                (transaction.getCard() == null) ?  null : (transaction.getCard().getDebitCard() == null) ? null : transaction.getCard().getDebitCard().getId(),
                (transaction.getCard() == null) ?  null : (transaction.getCard().getCreditCard() == null) ? null :transaction.getCard().getCreditCard().getId()
        );
    }
}
