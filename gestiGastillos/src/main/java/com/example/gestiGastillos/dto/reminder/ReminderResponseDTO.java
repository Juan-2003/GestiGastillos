package com.example.gestiGastillos.dto.reminder;

import com.example.gestiGastillos.model.Reminder;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"reminder_id", "name", "message", "date", "card_name", "last_digits", "credit_card_id"})
public record ReminderResponseDTO(
        @JsonProperty("reminder_id")
        Long id,
        String name,
        String message,
        String date,

        @JsonProperty("card_name")
        String cardName,

        @JsonProperty("last_digits")
        String lastDigits,

        @JsonProperty("credit_card_id")
        Long creditCardId,

        @JsonProperty("debit_card_id")
        Long debitCardId
) {
        public ReminderResponseDTO(Reminder reminder){
                this(
                        reminder.getId(),
                        reminder.getName(),
                        reminder.getMessage(),
                        reminder.getDate(),
                        (reminder.getCard() == null) ? null : reminder.getCard().getName(),
                        (reminder.getCard() == null) ? null : reminder.getCard().getLastDigits(),
                        (reminder.getCard() == null) ? null : (reminder.getCard().getCreditCard() == null) ? null : reminder.getCard().getCreditCard().getId(),
                        (reminder.getCard() == null) ? null : (reminder.getCard().getDebitCard() == null) ? null : reminder.getCard().getDebitCard().getId()
                );
        }
}
