package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.debitCard.DebitCardResponseDTO;
import com.example.gestiGastillos.dto.debitCard.DebitCardDataDTO;
import com.example.gestiGastillos.dto.debitCard.UpdateDebitCardDTO;
import com.example.gestiGastillos.dto.debitCard.UpdateDebitCardResponseDTO;
import com.example.gestiGastillos.service.DebitCardService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.net.URI;

@RestController
@RequestMapping("/gestiGastillos/debitCard")
public class DebitCardController {
    private final DebitCardService debitCardService;

    @Autowired
    public DebitCardController(DebitCardService debitCardService){
        this.debitCardService=debitCardService;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<DebitCardResponseDTO> registerDebitCard(@Valid @RequestBody DebitCardDataDTO debitCardDataDTO, UriComponentsBuilder uriComponentsBuilder){
        DebitCardResponseDTO debitCardResponseDTO = debitCardService.registerDebitCard(debitCardDataDTO);

        URI url = uriComponentsBuilder.path("/gestiGastillos/debitCard/{id}")
                .buildAndExpand(debitCardResponseDTO.debitCardId())
                .toUri();

        return ResponseEntity.created(url).body(debitCardResponseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DebitCardResponseDTO> getDebitCard(@PathVariable Long id){
        DebitCardResponseDTO debitCardResponseDTO = debitCardService.getDebitCard(id);
        return ResponseEntity.ok(debitCardResponseDTO);
    }
    @GetMapping("/debitCardsList")
    public ResponseEntity<List<DebitCardResponseDTO>> getDebitCardsList(Pageable pageable){
        List<DebitCardResponseDTO> debitCardResponseDTOS = debitCardService.getDebitCardsList(pageable);
        return ResponseEntity.ok(debitCardResponseDTOS);
    }

    @PutMapping("/update")
    @Transactional
    public ResponseEntity<UpdateDebitCardResponseDTO> updateDebitCard(@Valid @RequestBody UpdateDebitCardDTO updateDebitCardDTO){
        UpdateDebitCardResponseDTO updateDebitCardResponseDTO = debitCardService.updateDebitCard(updateDebitCardDTO);
        return ResponseEntity.ok(updateDebitCardResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDebitCard(@PathVariable Long id){
        debitCardService.deleteDebitCard(id);
        return ResponseEntity.noContent().build();
    }
}
