package com.example.gestiGastillos.dto.transactions;

import com.example.gestiGastillos.dto.transactions.expense.ExpenseResponseDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeResponseDTO;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record TransactionGetAllResponseDTO(
        @JsonProperty("expenses")
        List<ExpenseResponseDTO> expenseResponseDTO,
        @JsonProperty("incomes")
        List<IncomeResponseDTO> incomeResponseDTO
) {
    public TransactionGetAllResponseDTO(List<ExpenseResponseDTO> expenseResponseDTO, List<IncomeResponseDTO> incomeResponseDTO){
        this.expenseResponseDTO = expenseResponseDTO;
        this.incomeResponseDTO = incomeResponseDTO;
    }
}
