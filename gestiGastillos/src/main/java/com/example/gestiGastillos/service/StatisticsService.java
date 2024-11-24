package com.example.gestiGastillos.service;

import com.example.gestiGastillos.dto.MonthDTO;
import com.example.gestiGastillos.dto.transactions.TransactionListResponseDTO;
import com.example.gestiGastillos.dto.transactions.expense.ExpenseResponseDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeResponseDTO;
import com.example.gestiGastillos.infra.exceptions.EntityNotFoundException;
import com.example.gestiGastillos.model.User;
import com.example.gestiGastillos.model.transactions.Transactions;
import com.example.gestiGastillos.repository.TransactionsRepository;
import com.example.gestiGastillos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticsService {
    private final TransactionsRepository transactionsRepository;
    private final UserRepository userRepository;

    @Autowired
    public StatisticsService(TransactionsRepository transactionsRepository,  UserRepository userRepository){
        this.transactionsRepository = transactionsRepository;
        this.userRepository = userRepository;
    }

    public TransactionListResponseDTO getEstadistics(Long userId){

        String month = String.valueOf(LocalDate.now().getMonthValue());

        List<IncomeResponseDTO> incomeList = transactionsRepository.getIncomesByMonth(month, userId).stream().map(IncomeResponseDTO::new).toList();
        List<ExpenseResponseDTO> expenseList = transactionsRepository.getExpenseByMonth(month, userId).stream().map(ExpenseResponseDTO::new).toList();

        long incomeSum = incomeList.stream()
                .mapToLong(i -> i.amount().longValue())
                .sum();
        long expenseSum = expenseList.stream()
                .mapToLong(e -> e.amount().longValue())
                .sum();

        long totalSum = incomeSum - expenseSum;

        return new TransactionListResponseDTO(incomeSum, expenseSum, totalSum, incomeList, expenseList);
    }

    public List<MonthDTO> getAllMonthsStatistics(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("No encontrado"));

        user.get

        List<MonthDTO> monthDTOList = new ArrayList<>();
        for(int i = 1; i <= Month.values().length; i++){
            String monthNumber = String.valueOf(i);
            Month month = Month.of(i);

            List<IncomeResponseDTO> incomeList = transactionsRepository.getIncomesByMonth(monthNumber, userId).stream()
                    .map(IncomeResponseDTO::new).toList();
            List<ExpenseResponseDTO> expenseList = transactionsRepository.getExpenseByMonth(monthNumber, userId).stream()
                    .map(ExpenseResponseDTO::new).toList();

            long incomeSum = incomeList.stream()
                    .mapToLong(income -> income.amount().longValue())
                    .sum();
            long expenseSum = expenseList.stream()
                    .mapToLong(expense -> expense.amount().longValue())
                    .sum();
            long totalSum = incomeSum - expenseSum;

            MonthDTO monthDTO = new MonthDTO(month.name(), new TransactionListResponseDTO(incomeSum, expenseSum, totalSum, incomeList, expenseList));
            monthDTOList.add(monthDTO);
        }
        return monthDTOList;
    }
}
