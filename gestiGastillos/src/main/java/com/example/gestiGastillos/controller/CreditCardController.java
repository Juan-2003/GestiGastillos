package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.dto.creditCard.CreditCardResponseDTO;
import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardResponseDTO;
import com.example.gestiGastillos.service.CreditCardService;
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
@RequestMapping("/gestiGastillos/creditCard")
public class CreditCardController {
    private final CreditCardService creditCardService;

    @Autowired
    public CreditCardController(CreditCardService creditCardService){
        this.creditCardService = creditCardService;
    }


    //Registrar una nueva tarjeta de credito. Regresa un 201, la url y un JSON
    @PostMapping("/register")
    @Transactional
    public ResponseEntity<CreditCardResponseDTO> registerCreditCard(@Valid @RequestBody CreditCardDataDTO creditCardDataDTO, UriComponentsBuilder uriComponentsBuilder){
        CreditCardResponseDTO creditCardResponseDTO = creditCardService.registerCreditCard(creditCardDataDTO);

        URI url = uriComponentsBuilder.path("/gestiGastillos/creditCard/{id}")
                .buildAndExpand(creditCardResponseDTO.creditCardId())
                .toUri();

        return ResponseEntity.created(url).body(creditCardResponseDTO);
    }

    //Obtener la informacion de una tarjeta de credito en especifico. Regresa un 200 y un JSON
    //El id se obtiene desde la misma url.
    @GetMapping("/{id}")
    public ResponseEntity<CreditCardResponseDTO> getCreditCard(@PathVariable Long id){
        CreditCardResponseDTO creditCardResponseDTO = creditCardService.getCreditCard(id);
        return ResponseEntity.ok(creditCardResponseDTO);
    }

    //Obtener la lista de todas las tarjetas de credito en la BD. Regresa un 200 y una lista en el JSON
    @GetMapping("/creditCardsList")
    public ResponseEntity<List<CreditCardResponseDTO>> getCreditCardsList(Pageable pageable){
        List<CreditCardResponseDTO> creditCardResponseDTOS = creditCardService.getCreditCardsList(pageable);
        return ResponseEntity.ok(creditCardResponseDTOS);
    }

    @PutMapping("/update")
    @Transactional
    public ResponseEntity<UpdateCreditCardResponseDTO> updateCreditCard(@Valid @RequestBody UpdateCreditCardDTO updateCreditCardDTO){
        UpdateCreditCardResponseDTO updateCreditCardResponse = creditCardService.updateCreditCard(updateCreditCardDTO);
        return ResponseEntity.ok(updateCreditCardResponse);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCreditCard(@PathVariable Long id){
        creditCardService.deleteCreditCard(id);
        return  ResponseEntity.noContent().build();
    }
}

