package com.example.gestiGastillos.model.transactions;

import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.dto.transactions.income.UpdateIncomeDTO;
import com.example.gestiGastillos.model.card.Card;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity(name = "Transacciones")
@Table(name = "transactions")
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

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @Enumerated(EnumType.STRING)
    private TransactionCategory category;

    @Column(name = "payment_method")
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @ManyToOne
    @JoinColumn(name = "card_id")
    private Card card;

    public Transactions(IncomeDataDTO transactionDataDTO, Card card){
        this.type = TransactionType.fromSpanish(transactionDataDTO.type());
        this.amount = transactionDataDTO.amount();
        this.concept = transactionDataDTO.concept();
        this.category = TransactionCategory.fromSpanish(transactionDataDTO.category());
        this.paymentMethod = PaymentMethod.fromSpanish(transactionDataDTO.paymentMethod());
        this.card = card;
    }

    public Transactions(IncomeDataDTO transactionDataDTO){
        this.type = TransactionType.fromSpanish(transactionDataDTO.type());
        this.amount = transactionDataDTO.amount();
        this.concept = transactionDataDTO.concept();
        this.category = TransactionCategory.fromSpanish(transactionDataDTO.category());
        this.paymentMethod = PaymentMethod.fromSpanish(transactionDataDTO.paymentMethod());
    }

    public void update(UpdateIncomeDTO updateIncomeDTO){

        if(updateIncomeDTO.amount() != this.amount){
            this.amount = updateIncomeDTO.amount();
        }
        if(updateIncomeDTO.concept() != this.concept){
            this.concept = updateIncomeDTO.concept();
        }
        if(!this.category.name().equals(updateIncomeDTO.category())){
            this.category = TransactionCategory.fromSpanish(updateIncomeDTO.category());
        }

        if(this.paymentMethod.name() != updateIncomeDTO.paymentMethod()){
            this.paymentMethod = PaymentMethod.fromSpanish(updateIncomeDTO.paymentMethod());
        }
    }
}
