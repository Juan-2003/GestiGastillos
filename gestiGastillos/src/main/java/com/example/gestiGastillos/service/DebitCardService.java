package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.creditCard.CreditCardResponseDTO;
import com.example.gestiGastillos.dto.debitCard.DebitCardDataDTO;
import com.example.gestiGastillos.dto.debitCard.DebitCardResponseDTO;
import com.example.gestiGastillos.dto.debitCard.UpdateDebitCardDTO;
import com.example.gestiGastillos.dto.debitCard.UpdateDebitCardResponseDTO;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.example.gestiGastillos.model.card.Card;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.repository.CardRepository;
import com.example.gestiGastillos.repository.DebitCardRepository;
import com.example.gestiGastillos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
public class DebitCardService {
    private final UserRepository userRepository;
    private final DebitCardRepository debitCardRepository;
    private final CardRepository cardRepository;

    @Autowired
    public DebitCardService(UserRepository userRepository, DebitCardRepository debitCardRepository, CardRepository cardRepository){
        this.userRepository = userRepository;
        this.debitCardRepository = debitCardRepository;
        this.cardRepository = cardRepository;
    }

    public DebitCardResponseDTO registerDebitCard(DebitCardDataDTO debitCardDataDTO){
        Long user_id = debitCardDataDTO.user_id();
        String debitCardName = debitCardDataDTO.cardDataDTO().name();
        String lastDigits = debitCardDataDTO.cardDataDTO().lastDigits();
        String expirationDate = debitCardDataDTO.cardDataDTO().expirationDate();
        Double currentBalance = debitCardDataDTO.currentBalance();

        User user = userRepository.findById(user_id)
                .orElseThrow(() ->new RuntimeException("Usuario no encontrado"));

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

        Long id = updateDebitCardDTO.debitCardId();
        Optional<DebitCard> debitCardOptional = debitCardRepository.findById(id);

        if(debitCardOptional.isEmpty()){
            return null;
        }
        DebitCard debitCard = debitCardOptional.get();
        debitCard.updateDebitCard(updateDebitCardDTO);

        debitCardRepository.save(debitCard);
        return new UpdateDebitCardResponseDTO(debitCard);
    }

    public boolean deleteDebitCard(Long id){
        Optional<DebitCard> debitCardOptional = debitCardRepository.findById(id);
        if(debitCardOptional.isEmpty()){
            return false;
        }
        debitCardRepository.delete(debitCardOptional.get());
        cardRepository.delete(debitCardOptional.get().getCard());
        return true;
    }

}
