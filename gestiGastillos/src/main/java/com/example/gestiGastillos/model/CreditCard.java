package com.example.gestiGastillos.model;

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

    @OneToOne
    @JoinColumn(name = "card_id")
    private Card card;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public CreditCard(Card card, User user, String creditLimit, Double debt){
        this.card = card;
        this.user = user;
        this.creditLimit = creditLimit;
        this.debt = debt;
    }


}
