package com.example.gestiGastillos.model;

import jakarta.persistence.*;
import lombok.*;

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


    public User(String name){
        this.name = name;
    }
}
