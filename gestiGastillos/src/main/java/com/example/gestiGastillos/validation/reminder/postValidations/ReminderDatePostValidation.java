package com.example.gestiGastillos.validation.reminder.postValidations;

import com.example.gestiGastillos.dto.reminder.ReminderDataDTO;
import com.example.gestiGastillos.dto.reminder.UpdateReminderDTO;
import com.example.gestiGastillos.validation.ExpirationDate;
import com.example.gestiGastillos.validation.Validator;
import com.example.gestiGastillos.validation.reminder.ReminderValidator;
import org.springframework.stereotype.Component;

@Component
public class ReminderDatePostValidation implements ReminderValidator<Object> {

    @Override
    public void validation(Object dto) {
        String date = "";
        if(dto instanceof ReminderDataDTO){
            ReminderDataDTO reminderDataDTO = (ReminderDataDTO) dto;
            date = reminderDataDTO.date();
        }
        else if(dto instanceof UpdateReminderDTO){
            UpdateReminderDTO updateReminderDTO = (UpdateReminderDTO) dto;
            date = updateReminderDTO.date();
        }

        if(!date.isBlank()){
            ExpirationDate.expirationDateValidator(date);
        }
    }
}
