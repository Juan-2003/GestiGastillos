package com.example.gestiGastillos.model.transactions;

import com.example.gestiGastillos.dto.transactions.expense.UpdateExpenseDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.dto.transactions.income.UpdateIncomeDTO;
import com.example.gestiGastillos.model.User;
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

    private String title;
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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //Ingreso con tarjeta de debito
    public Transactions(IncomeDataDTO incomeDataDTO, Card card, User user){
        this.title = incomeDataDTO.title();
        this.type = TransactionType.fromSpanish(incomeDataDTO.type());
        this.amount = incomeDataDTO.amount();
        this.concept = incomeDataDTO.concept();
        this.category = TransactionCategory.fromSpanish(incomeDataDTO.category());
        this.paymentMethod = PaymentMethod.fromSpanish(incomeDataDTO.paymentMethod());
        this.date = incomeDataDTO.date();
        this.card = card;
        this.user = user;
    }


    //Ingreso con efectivo
    public Transactions(IncomeDataDTO incomeDataDTO, User user){
        this.title = incomeDataDTO.title();
        this.type = TransactionType.fromSpanish(incomeDataDTO.type());
        this.amount = incomeDataDTO.amount();
        this.concept = incomeDataDTO.concept();
        this.category = TransactionCategory.fromSpanish(incomeDataDTO.category());
        this.paymentMethod = PaymentMethod.fromSpanish(incomeDataDTO.paymentMethod());
        this.date = incomeDataDTO.date();
        this.user = user;
    }

    //Egreso con cualquier tarjeta
    public Transactions(ExpenseDataDTO expenseDataDTO, Card card, User user){
        this.title = expenseDataDTO.title();
        this.type = TransactionType.fromSpanish(expenseDataDTO.type());
        this.amount = expenseDataDTO.amount();
        this.concept = expenseDataDTO.concept();
        this.category = TransactionCategory.fromSpanish(expenseDataDTO.category());
        this.paymentMethod = PaymentMethod.fromSpanish(expenseDataDTO.paymentMethod());
        this.date = expenseDataDTO.date();
        this.card = card;
        this.user = user;
    }

    //Egreso con efectivo
    public Transactions(ExpenseDataDTO expenseDataDTO, User user){
        this.title = expenseDataDTO.title();
        this.type = TransactionType.fromSpanish(expenseDataDTO.type());
        this.amount = expenseDataDTO.amount();
        this.concept = expenseDataDTO.concept();
        this.category = TransactionCategory.fromSpanish(expenseDataDTO.category());
        this.paymentMethod = PaymentMethod.fromSpanish(expenseDataDTO.paymentMethod());
        this.date = expenseDataDTO.date();
        this.user = user;
    }

    //Actualizar ingreso
    public void updateIncome(UpdateIncomeDTO updateIncomeDTO){
        if(updateIncomeDTO.title() != this.title){
            this.title = updateIncomeDTO.title();
        }
        if(updateIncomeDTO.amount() != this.amount){
            this.amount = updateIncomeDTO.amount();
        }
        if(updateIncomeDTO.concept() != this.concept){
            this.concept = updateIncomeDTO.concept();
        }
    }

    //Actualizar egreso
    public void updateExpense(UpdateExpenseDTO updateExpenseDTO){
        if(updateExpenseDTO.title() != this.title){
            this.title = updateExpenseDTO.title();
        }
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
