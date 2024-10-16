package com.example.gestiGastillos.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserDataDTO(
        @NotBlank(message = "No debe estar vacio")
        @Size(min =4 , max = 20,message = "Nombre debe de tener entre 4 y 20 caracteres")
        String name
) {

}
