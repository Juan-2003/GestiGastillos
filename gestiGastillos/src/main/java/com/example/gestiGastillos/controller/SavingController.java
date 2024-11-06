package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.saving.SavingDataDTO;
import com.example.gestiGastillos.dto.saving.SavingResponseDTO;
import com.example.gestiGastillos.service.SavingService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/gestiGastillos/saving")
public class SavingController {
    private final SavingService savingService;

    @Autowired
    public SavingController(SavingService savingService){
        this.savingService = savingService;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<SavingResponseDTO> registerSaving(@Valid @RequestBody SavingDataDTO savingDataDTO, UriComponentsBuilder uriComponentsBuilder){
        SavingResponseDTO savingResponseDTO = savingService.registerSaving(savingDataDTO);

        URI url = uriComponentsBuilder.path("/gestiGastillos/creditCard/{id}")
                .buildAndExpand(savingResponseDTO.savingId())
                .toUri();
        return ResponseEntity.created(url).body(savingResponseDTO);
    }

    @GetMapping("/id")
    public ResponseEntity<SavingResponseDTO> getSaving(@PathVariable Long id){
        SavingResponseDTO savingResponseDTO = savingService.getSaving(id);
        return ResponseEntity.ok(savingResponseDTO);
    }
}
