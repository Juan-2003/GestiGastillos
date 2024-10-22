package com.example.gestiGastillos.model.transactions.income;

import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.model.transactions.TransactionType;
import org.springframework.stereotype.Component;

@Component
public class TypeValidator implements IncomeValidator {

    @Override
    public void validation(IncomeDataDTO incomeDataDTO) {
        String userType = incomeDataDTO.type();

        //Null, EXPENSE
        if(TransactionType.fromSpanish(userType) != TransactionType.INCOME){
            throw new RuntimeException("Error en el 'tipo' de transferencia");
        }
    }
}
