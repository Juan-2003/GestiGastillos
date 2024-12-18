package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.user.UserDataDTO;
import com.example.gestiGastillos.dto.user.UserResponseDTO;
import com.example.gestiGastillos.repository.UserRepository;
import com.example.gestiGastillos.service.UserService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriBuilderFactory;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/gestiGastillos/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/signup")
    @Transactional
    public ResponseEntity<UserResponseDTO> signUpRequest(@Valid @RequestBody UserDataDTO userDataDTO, UriComponentsBuilder uriComponentsBuilder){
        UserResponseDTO userResponseDTO = userService.signUpRequest(userDataDTO);

        URI url = uriComponentsBuilder.path("/gestiGastillos/user/signup/{id}")
                .buildAndExpand(userResponseDTO.id())
                .toUri();
        return ResponseEntity.created(url).body(userResponseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable Long id){
        UserResponseDTO userResponseDTO = userService.getUser(id);
        return ResponseEntity.ok(userResponseDTO);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
