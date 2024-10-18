package com.example.gestiGastillos.model;

import com.example.gestiGastillos.model.card.Card;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "Reminder")
@Table(name = "reminder")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Reminder {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String message;

    @OneToOne
    @JoinColumn(name = "card_id")
    private Card card;

}
