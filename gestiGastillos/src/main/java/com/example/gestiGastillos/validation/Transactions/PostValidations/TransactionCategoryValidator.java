package com.example.gestiGastillos.validation.Transactions.PostValidations;

import com.example.gestiGastillos.dto.transactions.expense.ExpenseDataDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidCategoryException;
import com.example.gestiGastillos.model.transactions.TransactionCategory;
import org.springframework.stereotype.Component;

@Component
public class TransactionCategoryValidator implements TransactionValidator<Object> {
    @Override
    public void validation(Object dto){
        String userCategory = "";
        if(dto instanceof ExpenseDataDTO){
            ExpenseDataDTO expenseDataDTO = (ExpenseDataDTO) dto;
            userCategory = expenseDataDTO.category();
        }
        else if(dto instanceof IncomeDataDTO){
            IncomeDataDTO incomeDataDTO = (IncomeDataDTO) dto;
            userCategory = incomeDataDTO.category();
        }
        if (TransactionCategory.fromSpanish(userCategory)==null){
            throw new InvalidCategoryException("Categoria no aceptada");
        }
    }
}
