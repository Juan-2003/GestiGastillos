package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.card.GetAllResponseDTO;
import com.example.gestiGastillos.dto.creditCard.CreditCardResponseDTO;
import com.example.gestiGastillos.dto.debitCard.DebitCardResponseDTO;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
public class CardService {
    private final CreditCardService creditCardService;
    private final DebitCardService debitCardService;

    @Autowired
    public CardService(CreditCardService creditCardService, DebitCardService debitCardService){
        this.creditCardService = creditCardService;
        this.debitCardService = debitCardService;
    }

    public GetAllResponseDTO getAllCards(Pageable pageable){
        List<CreditCardResponseDTO> creditCardResponseDTO = creditCardService.getCreditCardsList(pageable);
        List<DebitCardResponseDTO> debitCardResponseDTO = debitCardService.getDebitCardsList(pageable);

        return new GetAllResponseDTO(creditCardResponseDTO, debitCardResponseDTO);
    }
}
