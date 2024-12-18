package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.reminder.ReminderDataDTO;
import com.example.gestiGastillos.dto.reminder.ReminderResponseDTO;
import com.example.gestiGastillos.dto.reminder.UpdateReminderDTO;
import com.example.gestiGastillos.dto.reminder.UpdateReminderResponseDTO;
import com.example.gestiGastillos.infra.exceptions.EntityNotFoundException;
import com.example.gestiGastillos.model.Reminder;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.card.Card;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.example.gestiGastillos.repository.*;
import com.example.gestiGastillos.validation.reminder.ReminderValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class ReminderService {
    private final ReminderRepository reminderRepository;
    private final CardRepository cardRepository;
    private final CreditCardRepository creditCardRepository;
    private final DebitCardRepository debitCardRepository;
    private final UserRepository userRepository;
    private final List<ReminderValidator<Object>> reminderPostValidator;
    private final List<ReminderValidator<Object>> reminderPutValidator;

    @Autowired
    public ReminderService(ReminderRepository reminderRepository,
                           CardRepository cardRepository, CreditCardRepository creditCardRepository,  DebitCardRepository debitCardRepository,
                           UserRepository userRepository,
                           List<ReminderValidator<Object>> reminderValidator, List<ReminderValidator<Object>> reminderPutValidator){
        this.reminderRepository = reminderRepository;
        this.cardRepository = cardRepository;
        this.creditCardRepository = creditCardRepository;
        this.debitCardRepository = debitCardRepository;
        this.userRepository = userRepository;
        this.reminderPostValidator = reminderValidator;
        this.reminderPutValidator = reminderPutValidator;
    }

    public ReminderResponseDTO registerReminder(ReminderDataDTO reminderDataDTO){
        Reminder reminder;
        Card card;
        reminderPostValidator.forEach(r -> r.validation(reminderDataDTO));

        User user = userRepository.findById(reminderDataDTO.userId())
                .orElseThrow(() -> new EntityNotFoundException("'User' no encontrado con id: " + reminderDataDTO.userId()));

        if(reminderDataDTO.creditCardId() != null){
            CreditCard creditCard = creditCardRepository.findById(reminderDataDTO.creditCardId())
                    .orElseThrow(() -> new EntityNotFoundException("Tarjeta de credito no encontrada con id: " + reminderDataDTO.creditCardId()));

            card = creditCard.getCard();
            reminder = new Reminder(reminderDataDTO, card, user);

            card.setReminder(reminder);
            cardRepository.save(card);
            creditCardRepository.save(creditCard);
        }
        else if(reminderDataDTO.debitCardId() != null){
            DebitCard debitCard = debitCardRepository.findById(reminderDataDTO.debitCardId())
                    .orElseThrow(() -> new EntityNotFoundException("Tarjeta de credito no encontrada con id: " + reminderDataDTO.debitCardId()));

            card = debitCard.getCard();

            reminder = new Reminder(reminderDataDTO, card, user);
            card.setReminder(reminder);
            cardRepository.save(card);
            debitCardRepository.save(debitCard);
        }else{
            reminder = new Reminder(reminderDataDTO, user);
        }
        reminderRepository.save(reminder);

        return new ReminderResponseDTO(reminder);
    }

    public ReminderResponseDTO getReminder(Long id){
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recordatorio no encontrado con id: " +  id));

        return new ReminderResponseDTO(reminder);
    }

    public List<ReminderResponseDTO> getReminderList(Pageable pageable){
        return reminderRepository.findAll(pageable).map(ReminderResponseDTO::new).getContent();
    }

    public UpdateReminderResponseDTO updateReminder(UpdateReminderDTO updateReminderDTO){
        reminderPutValidator.forEach(r -> r.validation(updateReminderDTO));

        Reminder reminder = reminderRepository.findById(updateReminderDTO.id())
                .orElseThrow(() -> new EntityNotFoundException("Recordatorio no encontrado con id:" + updateReminderDTO.id()));

        reminder.update(updateReminderDTO);

        return new UpdateReminderResponseDTO(reminder);
    }

    public void deleteReminder(Long id){
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recordatorio no encontrado con id:" + id));

        reminderRepository.delete(reminder);
    }
}
