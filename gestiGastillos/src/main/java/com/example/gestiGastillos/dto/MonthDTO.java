package com.example.gestiGastillos.dto;

import com.example.gestiGastillos.dto.transactions.TransactionListResponseDTO;

public record MonthDTO(
        String month,
        TransactionListResponseDTO transactionListResponseDTO
) {
}
