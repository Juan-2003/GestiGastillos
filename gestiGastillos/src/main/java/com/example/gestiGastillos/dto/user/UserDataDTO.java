package com.example.gestiGastillos.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserDataDTO(
        @NotBlank(message = "No debe estar vacio")
        @Size(min =4 , max = 20,message = "Nombre debe de tener entre 4 y 20 caracteres")
        @Pattern(regexp = "^[A-Za-z]+([A-Za-z0-9]*)( [A-Za-z0-9]+)*$", message = "El nombre solo puede contener letras mayúsculas y minúsculas, sin espacios ni caracteres especiales.")
        String name
) {

}
