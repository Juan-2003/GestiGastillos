package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.transactions.expense.ExpenseDataDTO;
import com.example.gestiGastillos.dto.transactions.expense.ExpenseResponseDTO;
import com.example.gestiGastillos.dto.transactions.expense.UpdateExpenseDTO;
import com.example.gestiGastillos.dto.transactions.expense.UpdateExpenseResponseDTO;
import com.example.gestiGastillos.service.ExpenseService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

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

    @GetMapping("/expenseList")
    public ResponseEntity<List<ExpenseResponseDTO>> getExpenseList(Pageable pageable){
        List<ExpenseResponseDTO> expenseList = expenseService.getExpenseList(pageable);
        return ResponseEntity.ok(expenseList);
    }

    @PutMapping("/update")
    @Transactional
    public ResponseEntity<UpdateExpenseResponseDTO> updateExpense(@Valid @RequestBody UpdateExpenseDTO updateExpenseDTO){
        UpdateExpenseResponseDTO updateExpenseResponseDTO = expenseService.updateExpense(updateExpenseDTO);

        return ResponseEntity.ok(updateExpenseResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id){
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
