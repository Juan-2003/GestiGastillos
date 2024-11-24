package com.example.gestiGastillos.validation.savings;

import com.example.gestiGastillos.infra.exceptions.ReminderNameException;
import com.example.gestiGastillos.infra.exceptions.SavingNameException;
import com.example.gestiGastillos.model.Reminder;
import com.example.gestiGastillos.model.Saving;

import java.util.List;

public class SavingNameValidator {
    public static void savingNameValidation(Long savingId, String savingName, List<Saving> savingList) {
        boolean flag = savingList.stream()
                .anyMatch(s -> s.getName().equals(savingName)  && (savingId == null || !s.getId().equals(savingId)));

        if (flag) {
            throw new SavingNameException("Ya existe un saving con el nombre: " + savingName);
        }
    }
}
