package com.example.gestiGastillos.model.creditCard.PutValidations;

import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.infra.exceptions.EntityNotFoundException;
import com.example.gestiGastillos.infra.exceptions.InvalidCardNameException;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.repository.UserRepository;
import com.example.gestiGastillos.validation.CardName;
import com.example.gestiGastillos.validation.Validator;
import com.example.gestiGastillos.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/*
    3. Esta clase parece similar a la anterior, con la diferencia que ahora
    en la interfaz se especifica que se usara un "UpdateCreditCardDTO".
    Permitiendo el polimorfismo al poder tener un comporamiento diferente dependiendo
    contexto.

     Si te surgio la misma duda que a mi "¿Si todas las validaciones pertenecen a la misma interfaz "Validator"
     y yo quiero solamente usar las de POST en el service no tomara tambien los de PUT?
     Pues no, ya que el "Validator" puede diferenciar a que llamar dependiendo de la clase (en este caso el DTO)
     que se le mande.

    Ahora vamos aqui mismo abajo, punto 4.
 */
@Component
public class NamePutValidator implements Validator<UpdateCreditCardDTO> {
    private final UserRepository userRepository;

    @Autowired
    public NamePutValidator(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    /*
        4.Como puedes ver la logica de la validacion ya no esta aqui, esto pasa igual en las
        demas validations.
        Lo que ocurre es que la logica de cada uno se paso a una clase con un metodo estatico.
        Vamos a CardName.cardNameValidation
     */
    @Override
    public void validation(UpdateCreditCardDTO updateCreditCardDTO) {
        User user = userRepository.getReferenceById(updateCreditCardDTO.userId());
        CardName.cardNameValidation(updateCreditCardDTO.updateCardDTO().name(), user);

    }
}
