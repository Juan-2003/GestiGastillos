package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.transactions.expense.UpdateExpenseDTO;
import com.example.gestiGastillos.dto.transactions.expense.UpdateExpenseResponseDTO;
import com.example.gestiGastillos.infra.exceptions.EntityNotFoundException;
import com.example.gestiGastillos.infra.exceptions.ExpenseAmount;
import com.example.gestiGastillos.model.Saving;
import com.example.gestiGastillos.model.creditCard.CreditCard;
import com.example.gestiGastillos.model.debitCard.DebitCard;
import com.example.gestiGastillos.model.transactions.TransactionType;
import com.example.gestiGastillos.model.transactions.Transactions;
import com.example.gestiGastillos.dto.transactions.expense.ExpenseDataDTO;
import com.example.gestiGastillos.dto.transactions.expense.ExpenseResponseDTO;
import com.example.gestiGastillos.repository.CreditCardRepository;
import com.example.gestiGastillos.repository.DebitCardRepository;
import com.example.gestiGastillos.repository.SavingRepository;
import com.example.gestiGastillos.repository.TransactionsRepository;
import com.example.gestiGastillos.util.SavingStatus;
import com.example.gestiGastillos.util.SavingStatusEvalutator;
import com.example.gestiGastillos.validation.Transactions.PostValidations.TransactionValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {
    private final TransactionsRepository transactionsRepository;
    private final DebitCardRepository debitCardRepository;
    private final CreditCardRepository creditCardRepository;
    private final SavingRepository savingRepository;
    private final List<TransactionValidator<Object>> expenseValidator;

    @Autowired
    public ExpenseService(TransactionsRepository transactionsRepository, DebitCardRepository debitCardRepository, CreditCardRepository creditCardRepository, List<TransactionValidator<Object>> expenseValidator, SavingRepository savingRepository) {
        this.transactionsRepository = transactionsRepository;
        this.debitCardRepository = debitCardRepository;
        this.creditCardRepository = creditCardRepository;
        this.expenseValidator = expenseValidator;
        this.savingRepository = savingRepository;
    }

    public ExpenseResponseDTO registerExpense(ExpenseDataDTO expenseDataDTO){
        expenseValidator.forEach(i -> i.validation(expenseDataDTO));
        System.out.println(expenseDataDTO.creditCardId());
        System.out.println(expenseDataDTO.debitCardId());

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

            if (debitCard.getCurrentBalance()<expenseDataDTO.amount()){
                throw new ExpenseAmount("El monto no puede ser mayor al current balance");
            }
            Double oldCurrentBalance = debitCard.getCurrentBalance();
            Double amount = expenseDataDTO.amount();
            Double newCurrentBalance = oldCurrentBalance - amount;
            debitCard.setCurrentBalance(newCurrentBalance);
            transaction = new Transactions(expenseDataDTO, debitCard.getCard());

            if(debitCard.getCard().getSaving() != null){
                Saving saving = debitCard.getCard().getSaving();
                SavingStatus savingStatus = SavingStatusEvalutator.savingStatusEvaluator(newCurrentBalance, saving.getTargetAmount());
                saving.setStatus(savingStatus);
                savingRepository.save(saving);
            }

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

    public List<ExpenseResponseDTO> getExpenseList(Pageable pageable){
        List<ExpenseResponseDTO> expenseList = transactionsRepository.findAllByType(TransactionType.EXPENSE).stream()
                .map(ExpenseResponseDTO::new)
                .toList();

        return expenseList;
    }

    public UpdateExpenseResponseDTO updateExpense(UpdateExpenseDTO updateExpenseDTO) {
        Transactions expenseTransaction = transactionsRepository.findById(updateExpenseDTO.expenseId())
                .orElseThrow(() -> new EntityNotFoundException("La transaccion de egreso no ha sido encontrado con el id: " + updateExpenseDTO.expenseId() ));

        expenseTransaction.updateExpense(updateExpenseDTO);
        return new UpdateExpenseResponseDTO(expenseTransaction);
    }

    public void deleteExpense(Long id){
        Transactions transaction = transactionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transacción no encontrada con id: " + id));

        transactionsRepository.delete(transaction);
    }

}
