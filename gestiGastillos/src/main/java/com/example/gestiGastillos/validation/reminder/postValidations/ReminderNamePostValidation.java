package com.example.gestiGastillos.validation.reminder.postValidations;

import com.example.gestiGastillos.dto.reminder.ReminderDataDTO;
import com.example.gestiGastillos.dto.reminder.UpdateReminderDTO;
import com.example.gestiGastillos.model.Reminder;
import com.example.gestiGastillos.repository.ReminderRepository;
import com.example.gestiGastillos.validation.reminder.ReminderName;
import com.example.gestiGastillos.validation.reminder.ReminderValidator;
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
        Long reminderId = null;
        Long userId = null;

        if(dto instanceof ReminderDataDTO){
            ReminderDataDTO reminderDataDTO = (ReminderDataDTO) dto;
            name = reminderDataDTO.name();
            userId = reminderDataDTO.userId();
        }
        else if(dto instanceof UpdateReminderDTO){
            UpdateReminderDTO updateReminderDTO = (UpdateReminderDTO) dto;
            name = updateReminderDTO.name();
            reminderId = updateReminderDTO.id();

        }

        if(!name.isBlank()){
            //reminderList = reminderRepository.findAll();
            reminderList = reminderRepository.getReminderByUser(userId);
            ReminderName.reminderNameValidation(reminderId, name, reminderList);
        }
    }
}
