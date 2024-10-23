package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.creditCard.CreditCardDataDTO;
import com.example.gestiGastillos.dto.creditCard.CreditCardResponseDTO;
import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardResponseDTO;
import com.example.gestiGastillos.infra.exceptions.EntityNotFoundException;
import com.example.gestiGastillos.model.card.Card;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.validation.Validator;
import com.example.gestiGastillos.repository.CardRepository;
import com.example.gestiGastillos.repository.CreditCardRepository;
import com.example.gestiGastillos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/*
    6.Mira la linea 29 y 30. Parece como lo teniamos antes, pero la diferencia es que la lista
    sera de tipo "Validator" y a cada uno se le especifica con que DTO va a trabajar.

    Si bajas al POST y el UPDATE veras que todo esta muy similar.
 */
@Service
public class CreditCardService {
    private final UserRepository userRepository;
    private final CreditCardRepository creditCardRepository;
    private final CardRepository cardRepository;
    private final List<Validator<Object>> creditCardPostValidator;
    private final List<Validator<UpdateCreditCardDTO>> creditCardPutValidator;

    @Autowired
    public CreditCardService(UserRepository userRepository, CreditCardRepository creditCardRepository,
                             CardRepository cardRepository, List<Validator<Object>> creditCardPostValidator,
                             List<Validator<UpdateCreditCardDTO>> creditCardPutValidator){
        this.userRepository = userRepository;
        this.creditCardRepository = creditCardRepository;
        this.cardRepository = cardRepository;
        this.creditCardPostValidator = creditCardPostValidator;
        this.creditCardPutValidator = creditCardPutValidator;
    }

    public CreditCardResponseDTO registerCreditCard(CreditCardDataDTO creditCardDataDTO){
        Long user_id = creditCardDataDTO.user_id();
        String creditCardName = creditCardDataDTO.cardDataDTO().name();
        String lastDigits = creditCardDataDTO.cardDataDTO().lastDigits();
        String expirationDate = creditCardDataDTO.cardDataDTO().expirationDate();
        String creditLimit = creditCardDataDTO.creditLimit();
        Double debt = creditCardDataDTO.debt();

        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con id: " + user_id));

        creditCardPostValidator.forEach(c -> c.validation(creditCardDataDTO));

        Card card = new Card(creditCardName, lastDigits, expirationDate);
        cardRepository.save(card);

        CreditCard creditCard = new CreditCard(card, user, creditLimit, debt);
        creditCardRepository.save(creditCard);
        card.setCreditCard(creditCard);

        return new CreditCardResponseDTO(creditCard);

    }

    public CreditCardResponseDTO getCreditCard(Long id){
        CreditCard creditCard = creditCardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tarjeta de credito no encontrada con id: " + id));

        return new CreditCardResponseDTO(creditCard);
    }

    public List<CreditCardResponseDTO> getCreditCardsList(Pageable pageable){
        return  creditCardRepository.findAll(pageable).map(CreditCardResponseDTO::new).getContent();
    }

    public UpdateCreditCardResponseDTO updateCreditCard(UpdateCreditCardDTO updateCreditCardDTO){
        //Se valida que la tarjeta de credito exista mediante el id
        CreditCard creditCard = creditCardRepository.findById(updateCreditCardDTO.creditCardId())
                .orElseThrow(() -> new EntityNotFoundException("Tarjeta no encontrada con el id: " + updateCreditCardDTO.creditCardId()));

        //Se itera en las validaciones para PUT
        creditCardPutValidator.forEach(c -> c.validation(updateCreditCardDTO));

        //Se actualizan los datos
        creditCard.updateCreditCard(updateCreditCardDTO);

        creditCardRepository.save(creditCard);
        return new UpdateCreditCardResponseDTO(creditCard);
    }

    public void deleteCreditCard(Long id){
        if(!creditCardRepository.existsById(id)){
            throw new EntityNotFoundException("Tarjeta no encontrada con el id: " + id);
        }
        CreditCard creditCard =  creditCardRepository.getReferenceById(id);
        creditCardRepository.delete(creditCard);
        cardRepository.delete(creditCard.getCard());
    }
}