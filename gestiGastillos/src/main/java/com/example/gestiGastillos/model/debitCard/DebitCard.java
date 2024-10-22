package com.example.gestiGastillos.model.debitCard;

import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.dto.debitCard.UpdateDebitCardDTO;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.card.Card;
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
    public void updateDebitCard(UpdateDebitCardDTO updateDebitCardDTO){
        Long id = updateDebitCardDTO.debitCardId();
        String name = updateDebitCardDTO.updateCardDTO().name();
        Double currentBalance = updateDebitCardDTO.currentBalance();

        this.card.updateCard(name);

        if(!this.getCurrentBalance().equals(currentBalance)){
            this.setCurrentBalance(currentBalance);
        }
    }
}
