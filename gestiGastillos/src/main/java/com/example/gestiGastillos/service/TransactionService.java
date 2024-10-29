package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.card.GetAllResponseDTO;
import com.example.gestiGastillos.dto.transactions.TransactionGetAllResponseDTO;
import com.example.gestiGastillos.dto.transactions.expense.ExpenseResponseDTO;
import java.util.List;

import com.example.gestiGastillos.dto.transactions.income.IncomeResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {
    private final ExpenseService expenseService;
    private final IncomeService incomeService;

    @Autowired
    public TransactionService(ExpenseService expenseService, IncomeService incomeService){
        this.expenseService = expenseService;
        this.incomeService = incomeService;
    }

    public TransactionGetAllResponseDTO getAllTransactions(Pageable pageable){
        List<ExpenseResponseDTO> expenseResponseDTO = expenseService.getExpenseList(pageable);
        List<IncomeResponseDTO> incomeResponseDTO = incomeService.getIncomeList(pageable);

        return new TransactionGetAllResponseDTO(expenseResponseDTO, incomeResponseDTO);
    }
}
