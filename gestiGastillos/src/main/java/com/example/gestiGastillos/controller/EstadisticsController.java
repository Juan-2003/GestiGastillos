package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.transactions.TransactionListResponseDTO;
import com.example.gestiGastillos.dto.transactions.expense.ExpenseResponseDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeResponseDTO;
import com.example.gestiGastillos.model.transactions.Transactions;
import com.example.gestiGastillos.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/gesti-gastillos/estaditics")
public class EstadisticsController {
    private final TransactionsRepository transactionsRepository;

    @Autowired
    public EstadisticsController(TransactionsRepository transactionsRepository){
        this.transactionsRepository = transactionsRepository;
    }

    @GetMapping
    public ResponseEntity<TransactionListResponseDTO> getEstadistics(){
        List<IncomeResponseDTO> incomeList = transactionsRepository.getIncomesByMonth("02").stream().map(IncomeResponseDTO::new).toList();
        List<ExpenseResponseDTO> expenseList = transactionsRepository.getExpenseByMonth("02").stream().map(ExpenseResponseDTO::new).toList();

        TransactionListResponseDTO transactionListResponseDTO = new TransactionListResponseDTO(incomeList, expenseList);
        return ResponseEntity.ok(transactionListResponseDTO);
    }
}
