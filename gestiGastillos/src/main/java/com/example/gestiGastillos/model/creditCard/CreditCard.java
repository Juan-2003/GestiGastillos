package com.example.gestiGastillos.model.creditCard;

import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.model.card.Card;
import com.example.gestiGastillos.model.User;
import jakarta.persistence.*;
import lombok.*;

@Entity(name = "CreditCard")
@Table(name = "credit_card")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class CreditCard{
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "credit_limit")
    private String creditLimit;         //Limite de credito
    private Double debt;               //Deuda

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private Card card;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public CreditCard(Card card, User user, String creditLimit, Double debt){
        this.card = card;
        this.user = user;
        this.creditLimit = creditLimit;
        this.debt = debt;
    }

    public void updateCreditCard(UpdateCreditCardDTO updateCreditCardDTO){
        Long id = updateCreditCardDTO.creditCardId();
        String name = updateCreditCardDTO.updateCardDTO().name();
        String creditLimit = updateCreditCardDTO.creditLimit();
        Double debt = updateCreditCardDTO.debt();

        this.card.updateCard(name);

        if(!this.getCreditLimit().equals(creditLimit)){
            this.setCreditLimit(creditLimit);
        }
        if(!this.getDebt().equals(debt)){
            this.setDebt(debt);
        }
    }


}
