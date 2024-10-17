package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.dto.creditCard.CreditCardResponseDTO;
import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardResponseDTO;
import com.example.gestiGastillos.model.Card;
import com.example.gestiGastillos.model.CreditCard;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.repository.CardRepository;
import com.example.gestiGastillos.repository.CreditCardRepository;
import com.example.gestiGastillos.repository.UserRepository;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreditCardService {
    private final UserRepository userRepository;
    private final CreditCardRepository creditCardRepository;
    private final CardRepository cardRepository;

    @Autowired
    public CreditCardService(UserRepository userRepository, CreditCardRepository creditCardRepository, CardRepository cardRepository){
        this.userRepository = userRepository;
        this.creditCardRepository = creditCardRepository;
        this.cardRepository = cardRepository;
    }

    public CreditCardResponseDTO registerCreditCard(CreditCardDataDTO creditCardDataDTO){
        Long user_id = creditCardDataDTO.user_id();
        String name = creditCardDataDTO.name();
        String lastDigits = creditCardDataDTO.lastDigits();
        String expirationDate = creditCardDataDTO.expirationDate();
        String creditLimit = creditCardDataDTO.creditLimit();
        Double debt = creditCardDataDTO.debt();

        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Card card = new Card(name, lastDigits, expirationDate);
        cardRepository.save(card);

        CreditCard creditCard = new CreditCard(card, user, creditLimit, debt);
        creditCardRepository.save(creditCard);
        card.setCreditCard(creditCard);

        System.out.println(card.getCreditCard().getUser().getName());

        return new CreditCardResponseDTO(creditCard);

    }

    public CreditCardResponseDTO getCreditCard(Long id){
        CreditCard creditCard = creditCardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarjeta de credito no encontrada"));

        return new CreditCardResponseDTO(creditCard);
    }

    public List<CreditCardResponseDTO> getCreditCardsList(Pageable pageable){
        return  creditCardRepository.findAll(pageable).map(CreditCardResponseDTO::new).getContent();
    }

    public UpdateCreditCardResponseDTO updateCreditCard(UpdateCreditCardDTO updateCreditCardDTO){
        Long id = updateCreditCardDTO.creditCard_id();
        Optional<CreditCard> creditCardOptional = creditCardRepository.findById(id);

        if(creditCardOptional.isEmpty()){
            return null;
        }
        CreditCard creditCard = creditCardOptional.get();
        creditCard.updateCreditCard(updateCreditCardDTO);

        creditCardRepository.save(creditCard);
        return new UpdateCreditCardResponseDTO(creditCard);
    }

    public boolean deleteCreditCard(Long id){
        Optional<CreditCard>creditCardOptional= creditCardRepository.findById(id);
        if(creditCardOptional.isEmpty()){
            return false;
        }
        creditCardRepository.delete(creditCardOptional.get());
        cardRepository.delete(creditCardOptional.get().getCard());
        return true;
    }
}
