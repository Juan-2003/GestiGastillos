package com.example.gestiGastillos.model;

import com.example.gestiGastillos.model.card.Card;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "Saving")
@Table(name = "saving")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Saving {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "target_amount")
    private Double targetAmount;

   @OneToOne
    @JoinColumn(name = "card_id")
    private Card card;
}
