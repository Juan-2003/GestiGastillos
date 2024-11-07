package com.example.gestiGastillos.model;

import com.example.gestiGastillos.dto.saving.SavingDataDTO;
import com.example.gestiGastillos.dto.saving.UpdateSavingDTO;
import com.example.gestiGastillos.model.card.Card;
import com.example.gestiGastillos.util.SavingStatus;
import com.example.gestiGastillos.util.SavingStatusEvalutator;
import jakarta.persistence.*;
import lombok.*;

@Entity(name = "Saving")
@Table(name = "saving")
@Getter
@Setter
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

    @Enumerated(EnumType.STRING)
    private SavingStatus status;

   @OneToOne
    @JoinColumn(name = "card_id")
    private Card card;

   public Saving(SavingDataDTO savingDataDTO, Card card, SavingStatus savingStatus){
       this.name = savingDataDTO.name();
       this.targetAmount = savingDataDTO.targetAmount();
       this.status = savingStatus;
       this.card = card;
   }

   public void update(UpdateSavingDTO updateSavingDTO){
       if(!updateSavingDTO.name().equals(this.name)){
           this.name = updateSavingDTO.name();
       }
       if(!updateSavingDTO.targetAmount().equals(this.targetAmount)){
           this.targetAmount = updateSavingDTO.targetAmount();
           SavingStatus savingStatus = SavingStatusEvalutator.savingStatusEvaluator(card.getDebitCard().getCurrentBalance(), targetAmount);
           setStatus(savingStatus);
       }
   }
}
