package com.example.gestiGastillos.model.transactions;

import com.example.gestiGastillos.dto.transactions.expense.UpdateExpenseDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.dto.transactions.income.UpdateIncomeDTO;
import com.example.gestiGastillos.model.card.Card;
import com.example.gestiGastillos.dto.transactions.expense.ExpenseDataDTO;
import com.example.gestiGastillos.validation.Transactions.PostValidations.TransactionPaymentMethodValidator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Column(name = "date")
    private String date;

    @ManyToOne
    @JoinColumn(name = "card_id")
    private Card card;


    //Ingreso con tarjeta de debito
    public Transactions(IncomeDataDTO incomeDataDTO, Card card){
        this.type = TransactionType.fromSpanish(incomeDataDTO.type());
        this.amount = incomeDataDTO.amount();
        this.concept = incomeDataDTO.concept();
        this.category = TransactionCategory.fromSpanish(incomeDataDTO.category());
        this.paymentMethod = PaymentMethod.fromSpanish(incomeDataDTO.paymentMethod());
        this.date = incomeDataDTO.date();
        this.card = card;
    }


    //Ingreso con efectivo
    public Transactions(IncomeDataDTO incomeDataDTO){
        this.type = TransactionType.fromSpanish(incomeDataDTO.type());
        this.amount = incomeDataDTO.amount();
        this.concept = incomeDataDTO.concept();
        this.category = TransactionCategory.fromSpanish(incomeDataDTO.category());
        this.paymentMethod = PaymentMethod.fromSpanish(incomeDataDTO.paymentMethod());
        this.date = incomeDataDTO.date();
    }

    //Egreso con cualquier tarjeta
    public Transactions(ExpenseDataDTO expenseDataDTO, Card card){
        this.type = TransactionType.fromSpanish(expenseDataDTO.type());
        this.amount = expenseDataDTO.amount();
        this.concept = expenseDataDTO.concept();
        this.category = TransactionCategory.fromSpanish(expenseDataDTO.category());
        this.paymentMethod = PaymentMethod.fromSpanish(expenseDataDTO.paymentMethod());
        this.date = expenseDataDTO.date();
        this.card = card;
    }

    //Egreso con efectivo
    public Transactions(ExpenseDataDTO expenseDataDTO){
        this.type = TransactionType.fromSpanish(expenseDataDTO.type());
        this.amount = expenseDataDTO.amount();
        this.concept = expenseDataDTO.concept();
        this.category = TransactionCategory.fromSpanish(expenseDataDTO.category());
        this.paymentMethod = PaymentMethod.fromSpanish(expenseDataDTO.paymentMethod());
        this.date = expenseDataDTO.date();
    }

    //Actualizar ingreso
    public void updateIncome(UpdateIncomeDTO updateIncomeDTO){

        if(updateIncomeDTO.amount() != this.amount){
            this.amount = updateIncomeDTO.amount();
        }
        if(updateIncomeDTO.concept() != this.concept){
            this.concept = updateIncomeDTO.concept();
        }
    }

    //Actualizar egreso
    public void updateExpense(UpdateExpenseDTO updateExpenseDTO){
        if(updateExpenseDTO.amount() != this.amount){
            this.amount = updateExpenseDTO.amount();
        }
        if(updateExpenseDTO.concept() != this.concept){
            this.concept = updateExpenseDTO.concept();
        }
    }

    @Override
    public String toString() {
        return "id=" + id +
                ", amount=" + amount +
                ", concept='" + concept + '\'' +
                ", type=" + type +
                ", category=" + category +
                ", paymentMethod=" + paymentMethod +
                ", date='" + date + '\'' +
                ", card=" + card;
    }
}
