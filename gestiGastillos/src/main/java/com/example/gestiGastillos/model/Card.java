package com.example.gestiGastillos.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity(name = "Card")
@Table(name = "card")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Card {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;                //Nombre de la tarjeta

    @Column(name = "last_digits")
    private String lastDigits;          //Ultimos 4 digitos

    @Column(name = "expiration_date")
    private String expirationDate;        //Fecha de expiracion

    @OneToOne
    @JoinColumn(name = "credit_card_id")
    private CreditCard creditCard;

    @OneToOne
    @JoinColumn(name = "debit_card_id")
    private DebitCard debitCard;

    @OneToOne
    @JoinColumn(name = "saving_id")
    private Saving saving;

    @OneToOne
    @JoinColumn(name = "reminder_id")
    private Reminder reminder;

    public Card(String name, String lastDigits, String expirationDate){
        this.name = name;
        this.lastDigits = lastDigits;
        this.expirationDate = expirationDate;
    }
}
