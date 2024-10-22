package com.example.gestiGastillos.model.transactions.income;

import com.example.gestiGastillos.dto.transactions.income.IncomeDataDTO;
import com.example.gestiGastillos.model.transactions.PaymentMethod;
import com.example.gestiGastillos.model.transactions.TransactionCategory;
import org.springframework.stereotype.Component;

@Component
public class PaymentMethodValidator implements IncomeValidator{

    @Override
    public void validation(IncomeDataDTO incomeDataDTO) {
        String userPaymentMethod = incomeDataDTO.paymentMethod();

        if(PaymentMethod.fromSpanish(userPaymentMethod) == null){
            throw new RuntimeException("Metodo de pago no aceptado");
        }
    }
}
