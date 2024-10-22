package com.example.gestiGastillos.model.transactions.income;

import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.model.transactions.TransactionCategory;
import org.springframework.stereotype.Component;

@Component
public class TransactionCategoryValidator implements IncomeValidator{
    @Override
    public void validation(IncomeDataDTO incomeDataDTO) {
        String userCategory = incomeDataDTO.category();

        if(TransactionCategory.fromSpanish(userCategory) == null){
            throw new RuntimeException("Categoria no aceptada");
        }
    }
}
