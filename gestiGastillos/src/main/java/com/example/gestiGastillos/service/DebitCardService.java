package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.creditCard.CreditCardResponseDTO;
import com.example.gestiGastillos.dto.debitCard.DebitCardDataDTO;
import com.example.gestiGastillos.dto.debitCard.DebitCardResponseDTO;
import com.example.gestiGastillos.dto.debitCard.UpdateDebitCardDTO;
import com.example.gestiGastillos.dto.debitCard.UpdateDebitCardResponseDTO;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.example.gestiGastillos.model.card.Card;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.debitCard.PutValidation.DebitCardPutValidator;
import com.example.gestiGastillos.repository.CardRepository;
import com.example.gestiGastillos.repository.DebitCardRepository;
import com.example.gestiGastillos.repository.UserRepository;
import com.example.gestiGastillos.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;
//1
@Service
public class DebitCardService {
    private final UserRepository userRepository;
    private final DebitCardRepository debitCardRepository;
    private final CardRepository cardRepository;
    private final List<Validator<Object>> debitCardPostValidator;
    private final List<DebitCardPutValidator> debitCardPutValidator;

    @Autowired
    public DebitCardService(UserRepository userRepository, DebitCardRepository debitCardRepository,
                            CardRepository cardRepository, List<Validator<Object>> debitCardPostValidator,
                            List<DebitCardPutValidator> debitCardPutValidator) {
        this.userRepository = userRepository;
        this.debitCardRepository = debitCardRepository;
        this.cardRepository = cardRepository;
        this.debitCardPostValidator = debitCardPostValidator;
        this.debitCardPutValidator = debitCardPutValidator;
    }

    public DebitCardResponseDTO registerDebitCard(DebitCardDataDTO debitCardDataDTO){
        Long user_id = debitCardDataDTO.user_id();
        String debitCardName = debitCardDataDTO.cardDataDTO().name();
        String lastDigits = debitCardDataDTO.cardDataDTO().lastDigits();
        String expirationDate = debitCardDataDTO.cardDataDTO().expirationDate();
        Double currentBalance = debitCardDataDTO.currentBalance();

        User user = userRepository.findById(user_id)
                .orElseThrow(() ->new RuntimeException("Usuario no encontrado"));

        debitCardPostValidator.forEach(c -> c.validation(debitCardDataDTO));

        Card card = new Card(debitCardName, lastDigits, expirationDate);
        cardRepository.save(card);

        DebitCard debitCard = new DebitCard(currentBalance,card,user);
        debitCardRepository.save(debitCard);
        card.setDebitCard(debitCard);

        System.out.println(card.getDebitCard().getUser().getName());

        return new DebitCardResponseDTO(debitCard);
    }

    public DebitCardResponseDTO getDebitCard(Long id){
        DebitCard debitCard = debitCardRepository.findById(id)
                .orElseThrow(() ->new RuntimeException("Tarjeta de debito no encontrada"));

        return new DebitCardResponseDTO(debitCard);
    }

    public List<DebitCardResponseDTO> getDebitCardsList(Pageable pageable){
        return debitCardRepository.findAll(pageable).map(DebitCardResponseDTO::new).getContent();
    }

    public UpdateDebitCardResponseDTO updateDebitCard(UpdateDebitCardDTO updateDebitCardDTO){

        DebitCard debitCard = debitCardRepository.findById(updateDebitCardDTO.debitCardId())
                .orElseThrow(() ->new RuntimeException("Tarjeta no encontrada con el id: " + updateDebitCardDTO.debitCardId()));

        debitCardPutValidator.forEach(c -> c.validation(updateDebitCardDTO));

        debitCard.updateDebitCard(updateDebitCardDTO);

        debitCardRepository.save(debitCard);
        return new UpdateDebitCardResponseDTO(debitCard);
    }

    public void deleteDebitCard(Long id){
        if(!debitCardRepository.existsById(id)){
            throw new RuntimeException("Tarjeta no encontrada con el id: " + id);
        }
        DebitCard debitCard = debitCardRepository.getReferenceById(id);
        debitCardRepository.delete(debitCard);
        cardRepository.delete(debitCard.getCard());
    }

}