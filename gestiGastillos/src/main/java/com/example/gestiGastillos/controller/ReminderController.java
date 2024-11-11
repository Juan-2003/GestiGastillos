package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.reminder.ReminderDataDTO;
import com.example.gestiGastillos.dto.reminder.ReminderResponseDTO;
import com.example.gestiGastillos.dto.reminder.UpdateReminderDTO;
import com.example.gestiGastillos.dto.reminder.UpdateReminderResponseDTO;
import com.example.gestiGastillos.service.ReminderService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("gestiGastillos/reminder")
public class ReminderController {
    private final ReminderService reminderService;

    @Autowired
    public ReminderController(ReminderService reminderService){
        this.reminderService = reminderService;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<ReminderResponseDTO> registerReminder(@Valid @RequestBody ReminderDataDTO reminderDataDTO, UriComponentsBuilder uriComponentsBuilder){
        ReminderResponseDTO reminderResponseDTO = reminderService.registerReminder(reminderDataDTO);
        URI url = uriComponentsBuilder.path("gestiGastillos/reminder/{id}")
                .buildAndExpand(reminderResponseDTO.id())
                .toUri();

        return ResponseEntity.created(url).body(reminderResponseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReminderResponseDTO> getReminder(@PathVariable Long id){
        ReminderResponseDTO reminderResponseDTO = reminderService.getReminder(id);

        return ResponseEntity.ok(reminderResponseDTO);
    }

    @GetMapping("/reminderList")
    public ResponseEntity<List<ReminderResponseDTO>> getReminderList(Pageable pageable){
        List<ReminderResponseDTO> reminderResponseDTOS = reminderService.getReminderList(pageable);

        return ResponseEntity.ok(reminderResponseDTOS);
    }

    @PutMapping("/update")
    @Transactional
    public ResponseEntity<UpdateReminderResponseDTO> updateReminder(@Valid @RequestBody UpdateReminderDTO updateReminderDTO){
        UpdateReminderResponseDTO updateReminderResponseDTO = reminderService.updateReminder(updateReminderDTO);

        return ResponseEntity.ok(updateReminderResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delelteReminder(@PathVariable Long id){
        reminderService.deleteReminder(id);
        return ResponseEntity.noContent().build();
    }


}
