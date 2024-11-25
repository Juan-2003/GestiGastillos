package com.example.gestiGastillos.dto;

import com.example.gestiGastillos.dto.transactions.TransactionListResponseDTO;
import com.example.gestiGastillos.model.transactions.Transactions;

public record MonthDTO(
        String status,
        String month,
        TransactionListResponseDTO transactionListResponseDTO
) {
    public MonthDTO(String month, TransactionListResponseDTO transactionListResponseDTO){
        this("AVERAGE", month, transactionListResponseDTO);
    }
}
