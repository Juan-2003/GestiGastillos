package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.model.transactions.expense.ExpenseDataDTO;
import com.example.gestiGastillos.model.transactions.expense.ExpenseResponseDTO;
import com.example.gestiGastillos.service.ExpenseService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/gestiGastillos/expense")
public class ExpenseController {
    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<ExpenseResponseDTO> registerExpense(@Valid @RequestBody ExpenseDataDTO expenseDataDTO, UriComponentsBuilder uriComponentsBuilder){
        ExpenseResponseDTO expenseResponseDTO = expenseService.registerExpense(expenseDataDTO);

        URI url = uriComponentsBuilder.path("/gestiGastillos/expense/{id}")
                .buildAndExpand(expenseResponseDTO.transactionId())
                .toUri();

        return ResponseEntity.created(url).body(expenseResponseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseResponseDTO> getExpense(@PathVariable Long id){
        ExpenseResponseDTO expenseResponseDTO = expenseService.getExpense(id);
        return ResponseEntity.ok(expenseResponseDTO);
    }
}
