package com.example.gestiGastillos.model;

import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Entity(name = "User")
@Table(name = "user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class User {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "user")
    private List<CreditCard> creditCards;

    @OneToMany(mappedBy = "user")
    private List<DebitCard> debitCards;

    @OneToMany(mappedBy = "user")
    private List<Reminder> reminders;

    @OneToMany(mappedBy = "user")
    private List<Saving> savings;


    public User(String name){

        this.name = name;
        creditCards = new ArrayList<>();
        debitCards = new ArrayList<>();
    }
}
