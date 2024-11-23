package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.saving.*;
import com.example.gestiGastillos.service.SavingService;
import com.example.gestiGastillos.util.SavingStatus;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

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

    @GetMapping("/{id}")
    public ResponseEntity<SavingResponseDTO> getSaving(@PathVariable Long id){
        SavingResponseDTO savingResponseDTO = savingService.getSaving(id);
        return ResponseEntity.ok(savingResponseDTO);
    }

    @GetMapping("/generalStatus")
    public ResponseEntity<SavingGeneralStatusDTO> getGeneralStatus(){
        SavingGeneralStatusDTO savingGeneralStatusDTO = savingService.getGeneralStatus();
        return ResponseEntity.ok(savingGeneralStatusDTO);
    }

    @GetMapping("/savingList")
    public ResponseEntity<List<SavingResponseDTO>> getSavingList(Pageable pageable){
        List<SavingResponseDTO> savingList = savingService.getSavingList(pageable);
        return ResponseEntity.ok(savingList);
    }

    @PutMapping("/update")
    @Transactional
    public ResponseEntity<UpdateSavingResponseDTO> updateSaving(@Valid @RequestBody UpdateSavingDTO updateSavingDTO){
        UpdateSavingResponseDTO updateSavingResponseDTO = savingService.updateSaving(updateSavingDTO);
        return ResponseEntity.ok(updateSavingResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<Void> deleteSaving(@PathVariable Long id){
        savingService.deleteSaving(id);
        return ResponseEntity.noContent().build();
    }

}
