package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.card.GetAllResponseDTO;
import com.example.gestiGastillos.dto.transactions.TransactionGetAllResponseDTO;
import com.example.gestiGastillos.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gestiGastillos/transactions")
public class TransactionController {
    private TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) { this.transactionService = transactionService; }

    @GetMapping
    public ResponseEntity<TransactionGetAllResponseDTO> getAllTransactions(Pageable pageable) {
        TransactionGetAllResponseDTO transactionGetAllResponseDTO = transactionService.getAllTransactions(pageable);
        return ResponseEntity.ok(transactionGetAllResponseDTO);
    }
}
