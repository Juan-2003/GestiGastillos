package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.MonthDTO;
import com.example.gestiGastillos.dto.transactions.TransactionListResponseDTO;
import com.example.gestiGastillos.dto.transactions.expense.ExpenseResponseDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeResponseDTO;
import com.example.gestiGastillos.model.transactions.Transactions;
import com.example.gestiGastillos.repository.TransactionsRepository;
import com.example.gestiGastillos.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/gesti-gastillos/estaditics")
public class EstadisticsController {
    private final StatisticsService statisticsService;
    @Autowired
    public EstadisticsController(StatisticsService statisticsService){
        this.statisticsService = statisticsService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<TransactionListResponseDTO> getEstadistics(@PathVariable Long userId ){
        TransactionListResponseDTO transactionListResponseDTO = statisticsService.getEstadistics(userId);

        return ResponseEntity.ok(transactionListResponseDTO);
    }

    @GetMapping("/prueba/{userId2}")
    public ResponseEntity<List<MonthDTO>> prueba(@PathVariable Long userId2){
        List<MonthDTO> monthDTOList = statisticsService.getAllMonthsStatistics(userId2);

        return ResponseEntity.ok(monthDTOList);
    }
}
