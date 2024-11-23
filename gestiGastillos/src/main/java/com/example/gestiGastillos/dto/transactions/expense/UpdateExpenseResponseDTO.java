package com.example.gestiGastillos.dto.transactions.expense;

import com.example.gestiGastillos.model.transactions.Transactions;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record UpdateExpenseResponseDTO(
        @JsonProperty("expense_id")
        Long expenseId,
        String title,
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
        public UpdateExpenseResponseDTO(Transactions transaction){
                this(
                        transaction.getId(),
                        transaction.getTitle(),
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
