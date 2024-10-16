package com.example.gestiGastillos.dto;

import com.example.gestiGastillos.model.User;

import java.util.List;

public record UserDTO(
        String name,
        List<CreditCardDTO> creditCards,
        List<DebitCardDTO> debitCards
) {
    public UserDTO(User user){
        this(
                user.getName(),
                user.getCreditCards().stream().map(CreditCardDTO::new).toList(),
                user.getDebitCards().stream().map(DebitCardDTO::new).toList()
        );
    }
}
