package com.example.gestiGastillos.dto.transactions.expense;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public record ExpenseDataDTO(
        @NotBlank(message = "'titulo' no puede estar vacio")
        @Size(min =4 , max = 20,message = "'Titulo' debe de tener entre 4 y 20 caracteres")
        @Pattern(regexp = "^[A-Za-z]+([A-Za-z0-9]*)( [A-Za-z0-9]+)*$", message = "El 'titulo' solo puede contener letras mayúsculas y minúsculas, sin espacios ni caracteres especiales.")
        String title,

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
