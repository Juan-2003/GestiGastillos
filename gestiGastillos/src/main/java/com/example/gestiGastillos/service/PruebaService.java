package com.example.gestiGastillos.service;

import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.repository.CardRepository;
import com.example.gestiGastillos.repository.CreditCardRepository;
import com.example.gestiGastillos.repository.DebitCardRepository;
import com.example.gestiGastillos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PruebaService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CreditCardRepository creditCardRepository;

    @Autowired
    private DebitCardRepository debitCardRepository;

    @Autowired
    private CardRepository cardRepository;

    public void prueba(){
       User user = userRepository.getReferenceById(4l);
           
        System.out.println(user.getCreditCards().size());

        /*System.out.println(1);
        String name = pruebaEntradaDTO.nombre();
        System.out.println(2);
        User user = new User(name);
        System.out.println(3);
        userRepository.save(user);

        Card card = new Card("Tarjeta 1", "1234", "2025-12-05");
        System.out.println(4);
        DebitCard debitCard = new DebitCard(20000.0, card, user);
        System.out.println(5);

        cardRepository.save(card);
        debitCardRepository.save(debitCard);*/
        /*System.out.println(1);
        User user = userRepository.getReferenceById(4l);
        System.out.println(2);
        List<CreditCard> list = user.getCreditCards();
        System.out.println(3);
        for(int i = 0; i < list.size(); i++){
            System.out.println(list.get(i).getCard().getName());
        }
        System.out.println(4);*/

    }
}
