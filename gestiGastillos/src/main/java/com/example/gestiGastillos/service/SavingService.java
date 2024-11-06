package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.saving.SavingDataDTO;
import com.example.gestiGastillos.dto.saving.SavingResponseDTO;
import com.example.gestiGastillos.infra.exceptions.EntityNotFoundException;
import com.example.gestiGastillos.model.Saving;
import com.example.gestiGastillos.model.card.Card;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.example.gestiGastillos.repository.CardRepository;
import com.example.gestiGastillos.repository.CreditCardRepository;
import com.example.gestiGastillos.repository.DebitCardRepository;
import com.example.gestiGastillos.repository.SavingRepository;
import com.example.gestiGastillos.util.SavingStatus;
import com.example.gestiGastillos.util.SavingStatusEvalutator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SavingService {
    private final SavingRepository savingRepository;
    private final DebitCardRepository debitCardRepository;
    private final CardRepository cardRepository;
    @Autowired
    public SavingService(SavingRepository savingRepository, DebitCardRepository debitCardRepository, CardRepository cardRepository){
        this.savingRepository = savingRepository;
        this.debitCardRepository = debitCardRepository;
        this.cardRepository = cardRepository;
    }

    public SavingResponseDTO registerSaving(SavingDataDTO savingDataDTO){
        DebitCard debitCard =  debitCardRepository.findById(savingDataDTO.debitCardId())
                .orElseThrow(() -> new EntityNotFoundException("Tarjeta de debito no encontrada con id: " + savingDataDTO.debitCardId()));
        Card card = debitCard.getCard();
        SavingStatus savingStatus = SavingStatusEvalutator.savingStatusEvaluator(debitCard.getCurrentBalance(), debitCard.getCurrentBalance(), savingDataDTO.targetAmount());
        Saving saving = new Saving(savingDataDTO, card, savingStatus);
        savingRepository.save(saving);
        card.setSaving(saving);
        cardRepository.save(card);

        return new SavingResponseDTO(saving);
    }

    public SavingResponseDTO getSaving(Long id){
        Saving saving = savingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ahorro no econtrado con id: " + id));

        return new SavingResponseDTO(saving);
    }


}
