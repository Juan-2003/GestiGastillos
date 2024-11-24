package com.example.gestiGastillos.model;

import com.example.gestiGastillos.dto.reminder.ReminderDataDTO;
import com.example.gestiGastillos.dto.reminder.UpdateReminderDTO;
import com.example.gestiGastillos.model.card.Card;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "Reminder")
@Table(name = "reminder")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Reminder {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String message;
    private String date;

    @OneToOne
    @JoinColumn(name = "card_id")
    private Card card;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    //Crear recordatorio sin una tarjeta relacionada
    public Reminder(ReminderDataDTO reminderDataDTO, User user){
        this.name = reminderDataDTO.name();
        this.message = reminderDataDTO.message();
        this.date = reminderDataDTO.date();
        this.user = user;
    }

    //Crear recordatorio con una tarjeta relacionada
    public Reminder(ReminderDataDTO reminderDataDTO, Card card, User user){
        this.name = reminderDataDTO.name();
        this.message = reminderDataDTO.message();
        this.date = reminderDataDTO.date();
        this.card = card;
        this.user = user;
    }

    public void update(UpdateReminderDTO updateReminderDTO){
        if(!this.name.equals(updateReminderDTO.name())){
            this.name = updateReminderDTO.name();
        }
        if(!this.message.equals(updateReminderDTO.message())){
            this.message = updateReminderDTO.message();
        }
        if(!this.date.equals(updateReminderDTO.date())){
            this.date = updateReminderDTO.date();
        }
    }

}
