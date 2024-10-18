package com.example.gestiGastillos.model.card;

import com.example.gestiGastillos.model.DebitCard;
import com.example.gestiGastillos.model.Reminder;
import com.example.gestiGastillos.model.Saving;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.model.transactions.Transactions;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity(name = "Card")
@Table(name = "card")
@Getter
@Setter
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

    @OneToMany(mappedBy = "card")
    private List<Transactions> transactions;

    public Card(String name, String lastDigits, String expirationDate){
        this.name = name;
        this.lastDigits = lastDigits;
        this.expirationDate = expirationDate;
    }

    public  void updateCard(String name){
        if(!this.name.equals(name)){
            this.name = name;
        }
    }
}
