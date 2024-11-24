package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.creditCard.CreditCardResponseDTO;
import com.example.gestiGastillos.dto.saving.*;
import com.example.gestiGastillos.infra.exceptions.EntityNotFoundException;
import com.example.gestiGastillos.model.Saving;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.card.Card;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.example.gestiGastillos.repository.*;
import com.example.gestiGastillos.util.SavingStatus;
import com.example.gestiGastillos.util.SavingStatusEvalutator;
import com.example.gestiGastillos.validation.savings.postValidations.SavingNamePostValidation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class SavingService {
    private final SavingRepository savingRepository;
    private final DebitCardRepository debitCardRepository;
    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final SavingNamePostValidation<Object> savingNamePostValidation;

    @Autowired
    public SavingService(SavingRepository savingRepository, DebitCardRepository debitCardRepository,
                         CardRepository cardRepository, UserRepository userRepository,
                         SavingNamePostValidation<Object> savingNamePostValidation) {
        this.savingRepository = savingRepository;
        this.debitCardRepository = debitCardRepository;
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
        this.savingNamePostValidation = savingNamePostValidation;
    }

    public SavingResponseDTO registerSaving(SavingDataDTO savingDataDTO){

        savingNamePostValidation.validation(savingDataDTO);

        User user = userRepository.findById(savingDataDTO.userId())
                .orElseThrow(() -> new EntityNotFoundException("User no encontrado con id" + savingDataDTO.userId()));

        DebitCard debitCard =  debitCardRepository.findById(savingDataDTO.debitCardId())
                .orElseThrow(() -> new EntityNotFoundException("Tarjeta de debito no encontrada con id: " + savingDataDTO.debitCardId()));

        Card card = debitCard.getCard();

        SavingStatus savingStatus = SavingStatusEvalutator.savingStatusEvaluator(debitCard.getCurrentBalance(), savingDataDTO.targetAmount());
        Saving saving = new Saving(savingDataDTO, card, savingStatus, user);

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

    public SavingGeneralStatusDTO getGeneralStatus(){
        List<Saving> savingList = savingRepository.findAll();
        SavingStatus savingStatus = SavingStatusEvalutator.generalSavingStatus(savingList);
        return new SavingGeneralStatusDTO(savingStatus);
    }

    public List<SavingResponseDTO> getSavingList(Pageable pageable){
        return savingRepository.findAll(pageable).map(SavingResponseDTO::new).getContent();
    }

    public UpdateSavingResponseDTO updateSaving(UpdateSavingDTO updateSavingDTO){
        Saving saving = savingRepository.findById(updateSavingDTO.savingId())
                .orElseThrow(() -> new EntityNotFoundException("Ahorro no econtrado con id: " + updateSavingDTO.savingId()));
        savingNamePostValidation.validation(updateSavingDTO);

        saving.update(updateSavingDTO);
        savingRepository.save(saving);

        return new UpdateSavingResponseDTO(saving);
    }

    public void deleteSaving(Long id){
        Saving saving = savingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("'Saving' no encontrado con id: " + id));

        savingRepository.delete(saving);
    }


}
