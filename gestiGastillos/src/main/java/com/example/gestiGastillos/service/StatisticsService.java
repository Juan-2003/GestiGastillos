package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.transactions.TransactionListResponseDTO;
import com.example.gestiGastillos.dto.transactions.expense.ExpenseResponseDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeResponseDTO;
import com.example.gestiGastillos.model.transactions.Transactions;
import com.example.gestiGastillos.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticsService {
    private final TransactionsRepository transactionsRepository;

    @Autowired
    public StatisticsService(TransactionsRepository transactionsRepository){
        this.transactionsRepository = transactionsRepository;
    }

    public TransactionListResponseDTO getEstadistics(Long userId){
        List<IncomeResponseDTO> incomeList = transactionsRepository.getIncomesByMonth("11", userId).stream().map(IncomeResponseDTO::new).toList();
        List<ExpenseResponseDTO> expenseList = transactionsRepository.getExpenseByMonth("11", userId).stream().map(ExpenseResponseDTO::new).toList();

        long incomeSum = incomeList.stream()
                .mapToLong(i -> i.amount().longValue())
                .sum();
        long expenseSum = expenseList.stream()
                .mapToLong(e -> e.amount().longValue())
                .sum();

        long totalSum = incomeSum - expenseSum;

        return new TransactionListResponseDTO(incomeSum, expenseSum, totalSum, incomeList, expenseList);
    }
}
