package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.user.UserDataDTO;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public void signUpRequest(UserDataDTO userDataDTO){
        userRepository.save(new User(userDataDTO.name()));
        User user = new User(userDataDTO.name());
        userRepository.f
    }
}
