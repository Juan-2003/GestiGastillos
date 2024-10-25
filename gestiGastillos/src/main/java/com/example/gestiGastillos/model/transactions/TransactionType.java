package com.example.gestiGastillos.model.transactions;

public enum TransactionType {
    INCOME("income", "ingreso") ,
    EXPENSE("expense", "egreso");

    private String englishTransactionType;
    private String spanishTransactionType;

    TransactionType(String englishTransactionType, String spanishTransactionType){
        this.englishTransactionType = englishTransactionType;
        this.spanishTransactionType = spanishTransactionType;
    }

    public static TransactionType fromString(String userTransactionType){
        for(TransactionType transactionType : TransactionType.values()){
            if(userTransactionType.equalsIgnoreCase(transactionType.englishTransactionType)){
                return transactionType;
            }
        }
        return null;
    }

    public static TransactionType fromSpanish(String userTransactionType){
        for(TransactionType transactionType : TransactionType.values()){
            if(userTransactionType.equalsIgnoreCase(transactionType.spanishTransactionType)){
                return transactionType;
            }
        }
        return null;
    }
}
