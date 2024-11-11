package com.example.gestiGastillos.validation.Transactions.PostValidations;

import com.example.gestiGastillos.dto.transactions.expense.ExpenseDataDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.validation.ExpirationDate;
import com.example.gestiGastillos.validation.PaymentDay;
import org.hibernate.annotations.Comment;
import org.springframework.stereotype.Component;

@Component
public class TransactionDateValidator implements TransactionValidator<Object>{
    @Override
    public void validation(Object dto) {
        String date = "";
        if(dto instanceof IncomeDataDTO){
            IncomeDataDTO incomeDataDTO = (IncomeDataDTO) dto;
            date = incomeDataDTO.date();
        }
        if(dto instanceof ExpenseDataDTO){
            ExpenseDataDTO expenseDataDTO = (ExpenseDataDTO) dto;
            date = expenseDataDTO.date();
        }

        if(!date.isBlank()){
            //ExpirationDate.expirationDateValidator(date);
            PaymentDay.paymentDay(date);
        }
    }
}
