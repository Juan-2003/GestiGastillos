package com.example.gestiGastillos.validation.Transactions.PostValidations;

import com.example.gestiGastillos.dto.transactions.expense.ExpenseDataDTO;
import com.example.gestiGastillos.dto.transactions.expense.UpdateExpenseDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.dto.transactions.income.UpdateIncomeDTO;
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
        else if(dto instanceof ExpenseDataDTO){
            ExpenseDataDTO expenseDataDTO = (ExpenseDataDTO) dto;
            date = expenseDataDTO.date();
        }
        else if(dto instanceof UpdateIncomeDTO){
            UpdateIncomeDTO updateIncomeDTO = (UpdateIncomeDTO) dto;
            date = updateIncomeDTO.date();
        }
        else if (dto instanceof UpdateExpenseDTO){
            UpdateExpenseDTO updateExpenseDTO = (UpdateExpenseDTO) dto;
            date = updateExpenseDTO.date();
        }
        if(!date.isBlank()){
            //ExpirationDate.expirationDateValidator(date);
            PaymentDay.paymentDay(date);
        }
    }
}
