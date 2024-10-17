package com.example.gestiGastillos.model.transactions;

import com.example.gestiGastillos.model.Card;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Transacciones")
@Table(name = "Transacciones")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private String concept;
    private TransactionCategory category;

    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    @ManyToOne
    @JoinColumn(name = "card_id")
    private Card card;
}
