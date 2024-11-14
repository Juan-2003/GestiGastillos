package com.example.gestiGastillos.validation.savings.postValidations;

import com.example.gestiGastillos.dto.reminder.ReminderDataDTO;
import com.example.gestiGastillos.dto.reminder.UpdateReminderDTO;
import com.example.gestiGastillos.dto.saving.SavingDataDTO;
import com.example.gestiGastillos.dto.saving.UpdateSavingDTO;
import com.example.gestiGastillos.model.Reminder;
import com.example.gestiGastillos.model.Saving;
import com.example.gestiGastillos.repository.ReminderRepository;
import com.example.gestiGastillos.repository.SavingRepository;
import com.example.gestiGastillos.validation.reminder.ReminderName;
import com.example.gestiGastillos.validation.savings.SavingNameValidator;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import com.example.gestiGastillos.repository.SavingRepository;
import org.springframework.stereotype.Component;

@Component
public class SavingNamePostValidation<Object> {
    private final SavingRepository savingRepository;

    public SavingNamePostValidation(SavingRepository savingRepository){
        this.savingRepository = savingRepository;
    }

    public void validation(Object dto) {
        String name = "";
        List<Saving> savingList;

        if(dto instanceof SavingDataDTO){
            SavingDataDTO savingDataDTO = (SavingDataDTO) dto;
            name = savingDataDTO.name();
        }
        else if(dto instanceof UpdateSavingDTO){
            UpdateSavingDTO updateSavingDTO = (UpdateSavingDTO) dto;
            name = updateSavingDTO.name();
        }

        if(!name.isBlank()){
            savingList = savingRepository.findAll();
            SavingNameValidator.savingNameValidation(name, savingList);
        }
    }
}