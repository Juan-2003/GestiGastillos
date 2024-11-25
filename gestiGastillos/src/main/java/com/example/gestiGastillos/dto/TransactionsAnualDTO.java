package com.example.gestiGastillos.dto;

import java.util.List;

public record TransactionsAnualDTO(
        String status,
        List<MonthDTO> monthDTOList
) {
}
