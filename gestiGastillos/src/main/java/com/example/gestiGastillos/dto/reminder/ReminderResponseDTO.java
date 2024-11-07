package com.example.gestiGastillos.dto.reminder;

import com.example.gestiGastillos.model.Reminder;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"reminder_id", "name", "message", "date", "card_id"})
public record ReminderResponseDTO(
        @JsonProperty("reminder_id")
        Long id,
        String name,
        String message,
        String date,

        @JsonProperty("card_id")
        Long cardId
) {
        public ReminderResponseDTO(Reminder reminder){
                this(
                        reminder.getId(),
                        reminder.getName(),
                        reminder.getMessage(),
                        reminder.getDate(),
                        (reminder.getCard() == null) ? null : reminder.getCard().getId()
                );
        }
}