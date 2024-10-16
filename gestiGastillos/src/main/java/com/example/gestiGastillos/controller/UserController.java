package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.user.UserDataDTO;
import com.example.gestiGastillos.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gestiGastillos/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/signup")
    public void signUpRequest(@Valid @RequestBody UserDataDTO userDataDTO){
        System.out.println(userDataDTO.name());

    }

}
