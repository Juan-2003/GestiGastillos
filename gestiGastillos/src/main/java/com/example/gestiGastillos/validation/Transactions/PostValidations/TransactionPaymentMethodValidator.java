package com.example.gestiGastillos.validation.Transactions.PostValidations;

import com.example.gestiGastillos.dto.transactions.expense.ExpenseDataDTO;
import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.dto.transactions.income.UpdateIncomeDTO;
import com.example.gestiGastillos.infra.exceptions.InvalidPaymentMethodException;
import com.example.gestiGastillos.model.transactions.PaymentMethod;
import org.springframework.stereotype.Component;

@Component
public class TransactionPaymentMethodValidator implements TransactionValidator<Object> {
    @Override
    public void validation(Object dto){
        String userPaymentMethod = "";
        if (dto instanceof ExpenseDataDTO){
            ExpenseDataDTO expenseDataDTO = (ExpenseDataDTO) dto;
            userPaymentMethod = expenseDataDTO.paymentMethod();
            if(PaymentMethod.fromSpanish(userPaymentMethod)==null){
                throw new InvalidPaymentMethodException("Metodo de pago no aceptado");
            }
        }
        else if(dto instanceof IncomeDataDTO){
            IncomeDataDTO incomeDataDTO = (IncomeDataDTO) dto;
            userPaymentMethod = incomeDataDTO.paymentMethod();
            if (PaymentMethod.CREDIT_CARD.equals(PaymentMethod.fromSpanish(userPaymentMethod))) {
                throw new InvalidPaymentMethodException("No se permite tarjeta de credito en ingresos");
            }
            if(PaymentMethod.fromSpanish(userPaymentMethod) == null){
                throw new InvalidPaymentMethodException("Metodo de pago no aceptado");
            }
        }
    }
}
