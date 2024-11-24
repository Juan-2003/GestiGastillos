package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.user.UserDataDTO;
import com.example.gestiGastillos.dto.user.UserResponseDTO;
import com.example.gestiGastillos.infra.exceptions.EntityNotFoundException;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.repository.*;
import com.example.gestiGastillos.validation.user.UserValidator;
import jakarta.transaction.UserTransaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final TransactionsRepository transactionsRepository;
    private final ReminderRepository reminderRepository;
    private final DebitCardRepository debitCardRepository;
    private final CreditCardRepository creditCardRepository;
    private final SavingRepository savingRepository;
    private final UserValidator<UserDataDTO> userValidator;

    @Autowired
    public UserService(UserRepository userRepository, CardRepository cardRepository,
                       TransactionsRepository transactionsRepository, ReminderRepository reminderRepository,
                       DebitCardRepository debitCardRepository, CreditCardRepository creditCardRepository,
                       SavingRepository savingRepository, UserValidator<UserDataDTO> userValidator){
        this.userRepository = userRepository;
        this.cardRepository = cardRepository;
        this.transactionsRepository = transactionsRepository;
        this.reminderRepository = reminderRepository;
        this.debitCardRepository = debitCardRepository;
        this.creditCardRepository = creditCardRepository;
        this.savingRepository = savingRepository;
        this.userValidator = userValidator;
    }

    public UserResponseDTO signUpRequest(UserDataDTO userDataDTO){
        userValidator.validation(userDataDTO);

        User user = new User(userDataDTO.name());
        userRepository.save(user);

        return new UserResponseDTO(user.getId(), user.getName());
    }

    public UserResponseDTO getUser(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("'User' no encontrado con id: " + id));

        return new UserResponseDTO(user);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("'User' no encontrado con id: " + id));

        cardRepository.deleteAll();
        transactionsRepository.deleteAll();
        reminderRepository.deleteAll();
        debitCardRepository.deleteAll();
        creditCardRepository.deleteAll();
        savingRepository.deleteAll();
        userRepository.deleteAll();
    }
}
