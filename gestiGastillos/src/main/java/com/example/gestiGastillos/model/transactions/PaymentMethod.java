package com.example.gestiGastillos.model.transactions;

public enum PaymentMethod {
    CASH("cash", "efectivo"),
    CREDIT_CARD("credit_card", "tarjeta_credito"),
    DEBIT_CARD("debit_card", "tarjeta_debito");

    private String englishPaymentMethod;
    private String spanishPaymentMethod;

    PaymentMethod(String englishPaymentMethod, String spanishPaymentMethod){
        this.englishPaymentMethod = englishPaymentMethod;
        this.spanishPaymentMethod = spanishPaymentMethod;
    }

    public static PaymentMethod fromString(String userPaymentMethod){
        for(PaymentMethod paymentMethod : PaymentMethod.values()){
            if(userPaymentMethod.equalsIgnoreCase(paymentMethod.englishPaymentMethod)){
                return paymentMethod;
            }
        }
        return null;
    }

    public static PaymentMethod fromSpanish(String userPaymentMethod){
        for(PaymentMethod paymentMethod : PaymentMethod.values()){
            if(userPaymentMethod.equalsIgnoreCase(paymentMethod.spanishPaymentMethod)){
                return paymentMethod;
            }
        }
        return null;
    }
}
