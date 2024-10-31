package com.example.gestiGastillos.validation.reminder.postValidations;

import com.example.gestiGastillos.dto.reminder.ReminderDataDTO;
import com.example.gestiGastillos.dto.reminder.UpdateReminderDTO;
import com.example.gestiGastillos.model.Reminder;
import com.example.gestiGastillos.repository.ReminderRepository;
import com.example.gestiGastillos.validation.Validator;
import com.example.gestiGastillos.validation.reminder.ReminderName;
import com.example.gestiGastillos.validation.reminder.ReminderValidator;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReminderNamePostValidation implements ReminderValidator<Object> {
    private final ReminderRepository reminderRepository;

    @Autowired
    public ReminderNamePostValidation(ReminderRepository reminderRepository){
        this.reminderRepository = reminderRepository;
    }

    @Override
    public void validation(Object dto) {
        String name = "";
        List<Reminder> reminderList;

        if(dto instanceof ReminderDataDTO){
            ReminderDataDTO reminderDataDTO = (ReminderDataDTO) dto;
            name = reminderDataDTO.name();
        }
        else if(dto instanceof UpdateReminderDTO){
            UpdateReminderDTO updateReminderDTO = (UpdateReminderDTO) dto;
            name = updateReminderDTO.name();
        }

        if(!name.isBlank()){
            reminderList = reminderRepository.findAll();
            ReminderName.reminderNameValidation(name, reminderList);
        }
    }
}
