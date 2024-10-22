package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.creditCard.UpdateCreditCardDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeResponseDTO;
import com.example.gestiGastillos.dto.transactions.income.UpdateIncomeDTO;
import com.example.gestiGastillos.dto.transactions.income.UpdateIncomeResponseDTO;
import com.example.gestiGastillos.service.IncomeService;
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
@RequestMapping("/gestiGastillos/income")
public class IncomeController {
    private final IncomeService incomeService;

    @Autowired
    public IncomeController(IncomeService incomeService){
        this.incomeService = incomeService;
    }

    @PostMapping
    public ResponseEntity<IncomeResponseDTO> registerIncome(@Valid @RequestBody IncomeDataDTO incomeDataDTO, UriComponentsBuilder uriComponentsBuilder){
        IncomeResponseDTO transactionResponseDTO = incomeService.registerIncome(incomeDataDTO);

        URI url = uriComponentsBuilder.path("/gestiGastillos/income/{id}")
                .buildAndExpand(transactionResponseDTO.transactionId())
                .toUri();
        return ResponseEntity.created(url).body(transactionResponseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IncomeResponseDTO> getIncome(@PathVariable Long id){
        IncomeResponseDTO incomeResponseDTO = incomeService.getIncome(id);
        return ResponseEntity.ok(incomeResponseDTO);
    }

    @GetMapping("/incomeList")
    public ResponseEntity<List<IncomeResponseDTO>> getIncomeList(Pageable pageable){
        List<IncomeResponseDTO> incomeList = incomeService.getIncomeList(pageable);
        return ResponseEntity.ok(incomeList);
    }

    @PutMapping("/update")
    @Transactional
    public ResponseEntity<UpdateIncomeResponseDTO> upateIncome(@Valid @RequestBody UpdateIncomeDTO updateIncomeDTO){
        UpdateIncomeResponseDTO updateIncomeResponseDTO = incomeService.upateIncome(updateIncomeDTO);

        return ResponseEntity.ok(updateIncomeResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id){
        incomeService.deleteIcome(id);
        return ResponseEntity.noContent().build();
    }
}
