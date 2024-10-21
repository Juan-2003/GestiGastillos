package com.example.gestiGastillos.dto.card;

import jakarta.validation.constraints.NotBlank;

public record UpdateCardDTO(
    @NotBlank(message = "'name' no puede estar vacio")
    String name
) {

}
