package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.card.GetAllResponseDTO;
import com.example.gestiGastillos.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/gestiGastillos/cards")
public class CardController {
    private CardService cardService;

    @Autowired
    public CardController(CardService cardService){
        this.cardService = cardService;
    }

    @GetMapping
    public ResponseEntity<GetAllResponseDTO> getAllCards(Pageable pageable){
        GetAllResponseDTO getAllResponseDTO = cardService.getAllCards(pageable);
        return ResponseEntity.ok(getAllResponseDTO);
    }
}
