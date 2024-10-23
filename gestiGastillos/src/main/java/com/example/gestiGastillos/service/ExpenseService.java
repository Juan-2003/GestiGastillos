package com.example.gestiGastillos.service;

import com.example.gestiGastillos.infra.exceptions.EntityNotFoundException;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.example.gestiGastillos.model.transactions.TransactionType;
import com.example.gestiGastillos.model.transactions.Transactions;
import com.example.gestiGastillos.model.transactions.expense.ExpenseDataDTO;
import com.example.gestiGastillos.model.transactions.expense.ExpenseResponseDTO;
import com.example.gestiGastillos.repository.CreditCardRepository;
import com.example.gestiGastillos.repository.DebitCardRepository;
import com.example.gestiGastillos.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {
    private final TransactionsRepository transactionsRepository;
    private final DebitCardRepository debitCardRepository;
    private final CreditCardRepository creditCardRepository;

    @Autowired
    public ExpenseService(TransactionsRepository transactionsRepository, DebitCardRepository debitCardRepository, CreditCardRepository creditCardRepository ){
        this.transactionsRepository = transactionsRepository;
        this.debitCardRepository = debitCardRepository;
        this.creditCardRepository = creditCardRepository;
    }

    public ExpenseResponseDTO registerExpense(ExpenseDataDTO expenseDataDTO){
        Transactions transaction;
        if(expenseDataDTO.creditCardId() != null){//El egreso se hizo con trarjeta de credito
            Long creditCardId = expenseDataDTO.creditCardId();
            CreditCard creditCard = creditCardRepository.findById(creditCardId)
                    .orElseThrow(() -> new EntityNotFoundException("Tarjeta de credito no encontrada con el id: " + creditCardId));

            Double debt = creditCard.getDebt();
            Double amount = expenseDataDTO.amount();
            creditCard.setDebt(debt + amount);

            transaction = new Transactions(expenseDataDTO, creditCard.getCard());
        }
        else if(expenseDataDTO.debitCardId() != null){//El egreso se hizo con tarjeta de debito
            Long debitCardId = expenseDataDTO.debitCardId();
            DebitCard debitCard = debitCardRepository.findById(debitCardId)
                    .orElseThrow(() -> new EntityNotFoundException("Tarjeta de debito no encontrada con el id: " + debitCardId));

            Double currentBalance = debitCard.getCurrentBalance();
            Double amount = expenseDataDTO.amount();
            debitCard.setCurrentBalance(currentBalance - amount);
            transaction = new Transactions(expenseDataDTO, debitCard.getCard());

        }else{//El egreso se hizo con efectivo
            transaction = new Transactions(expenseDataDTO);
        }

        transactionsRepository.save(transaction);
        return new ExpenseResponseDTO(transaction);
    }

    public ExpenseResponseDTO getExpense(Long id){
        Transactions transaction = transactionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transacción no encontrada con id: " + id));

        if(transaction.getType() != TransactionType.EXPENSE){
            throw new RuntimeException("La transaccion no es un egreso");
        }

        return new ExpenseResponseDTO(transaction);
    }
}
