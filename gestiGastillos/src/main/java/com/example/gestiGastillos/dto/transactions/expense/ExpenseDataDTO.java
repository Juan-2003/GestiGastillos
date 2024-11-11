package com.example.gestiGastillos.dto.transactions.expense;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record ExpenseDataDTO(
        @NotBlank(message = "'tipo' no puede estar vacio")
        String type,

        @NotNull(message = "'cantidad' no puede estar vacia")
        @Positive(message = "'cantidad' debe ser mayor que 0")
        Double amount,

        @NotBlank(message = "'concepto' no puede estar vacio")
        @Size(max = 50, message = "El concepto no puede exceder los 50 caracteres")
        String concept,

        @NotBlank(message = "'categoria' no puede estar vacia")
        String category,

        @NotBlank(message = "'metodo de pago' no puede estar vacia")
        @JsonProperty("payment_method")
        String paymentMethod,

        @NotBlank(message = "'Fecha' no puede estar vacia")
        String date,

        @JsonProperty("debit_card_id")
        Long debitCardId,

        @JsonProperty("credit_card_id")
        Long creditCardId
) {
}
