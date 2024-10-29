package com.example.gestiGastillos.validation.reminder;

import com.example.gestiGastillos.infra.exceptions.ReminderNameException;
import com.example.gestiGastillos.model.Reminder;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.repository.ReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ReminderName {
    public static void reminderNameValidation(String reminderName, List<Reminder> reminderList){
        boolean flag = reminderList.stream()
                .anyMatch(r -> r.getName().equals(reminderName));

        if(flag){
            throw new ReminderNameException("Ya existe un recordatorio con el nombre: " + reminderName);
        }
    }
}
