package com.example.gestiGastillos.validation.Transactions.PostValidations;

import com.example.gestiGastillos.dto.transactions.expense.ExpenseDataDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidTypeException;
import com.example.gestiGastillos.model.transactions.TransactionType;
import org.springframework.stereotype.Component;

@Component
public class TransactionTypeValidator implements TransactionValidator<Object> {
    @Override
    public void validation(Object dto) {
        String userType = "";
        if (dto instanceof ExpenseDataDTO){
            ExpenseDataDTO expenseDataDTO = (ExpenseDataDTO) dto;
            userType=expenseDataDTO.type();
            if(TransactionType.fromSpanish(userType)!= TransactionType.EXPENSE){
                throw new InvalidTypeException("Error en el 'tipo' de transferencia");
            }
        }
        else if(dto instanceof IncomeDataDTO){
            IncomeDataDTO incomeDataDTO = (IncomeDataDTO) dto;
            userType=incomeDataDTO.type();
            if(TransactionType.fromSpanish(userType)!= TransactionType.INCOME){
                throw new InvalidTypeException("Error en el 'tipo' de transferencia");
            }
        }
    }
}
