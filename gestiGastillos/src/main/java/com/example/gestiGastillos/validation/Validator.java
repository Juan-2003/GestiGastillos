package com.example.gestiGastillos.validation;

/*
    1. Wacha Chiquis, la interfaz que las clases implementaran sera esta. ¿Porque el cambio?
    En vez de tener una interfaz para el POST de la tarjeta de credito, otra intefaz para el PUT
    de la tarjeta de credito y asi con cada uno, este servira para todos.
    Se hace uso de los "Tipos genericos" (<T>) donde esta T podra recibir cualquier clase que sea necesaria
    En este caso servira para mandar DTO diferntes, como CreditCardDataDTO o UpdateDataDTO.

    Ahora ve al archivo de "ExpirationDatePostValidator" que esta en model -> creditCard -> PostValidations
 */
public interface Validator<T> {
    void validation(T dto);
}
