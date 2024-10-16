package com.example.gestiGastillos.model;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "DebitCard")
@Table(name = "debit_card")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class DebitCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "current_balance")
    private Double currentBalance;      //Saldo actual

    @OneToOne
    @JoinColumn(name = "card_id")
    private Card card;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public DebitCard(Double currentBalance, Card card, User user){
        this.currentBalance = currentBalance;
        this.card = card;
        this.user = user;
    }
}
