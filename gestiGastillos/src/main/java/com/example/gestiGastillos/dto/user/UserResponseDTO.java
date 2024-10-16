package com.example.gestiGastillos.dto.user;

import com.example.gestiGastillos.model.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

//Este DTO sirve como respuesta hacia los request del usuario
@JsonPropertyOrder({"user_id", "name"})//Especifica el orden en que apareceran en el JSON
public record UserResponseDTO(
        @JsonProperty("user_id")//Especifica el nombre distinto que tendra en el JSON
        Long id,
        String name
) {
    public UserResponseDTO(User user){
        this(user.getId(), user.getName());
    }
}
