package com.example.gestiGastillos.validation.user;

import com.example.gestiGastillos.dto.user.UserDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCardNameException;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.repository.UserRepository;
import com.example.gestiGastillos.validation.CardName;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserNameValidation implements UserValidator<UserDataDTO> {
    private final UserRepository userRepository;

    public UserNameValidation(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public void validation(UserDataDTO dto) {
        List<User> userList = userRepository.findAll();

        boolean flag =  userList.stream()
                .anyMatch(user -> user.getName().equals(dto.name()));

        if(flag){
            throw new InvalidCardNameException(String.format("El nombre de usuario '%s' ya esta en uso", dto.name()));
        }
    }
}
