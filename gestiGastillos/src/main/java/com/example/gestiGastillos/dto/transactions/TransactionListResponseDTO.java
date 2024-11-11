package com.example.gestiGastillos.dto.transactions;

import com.example.gestiGastillos.dto.transactions.expense.ExpenseResponseDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeResponseDTO;
import com.example.gestiGastillos.model.transactions.Transactions;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.boot.autoconfigure.pulsar.PulsarProperties;

import java.util.List;
import java.util.stream.Collectors;

public record TransactionListResponseDTO(
        @JsonProperty("income")
        List<IncomeResponseDTO> incomeResponseDTO,
        @JsonProperty("expense")
        List<ExpenseResponseDTO> expenseResponseDTO

) {

}
