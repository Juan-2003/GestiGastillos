package com.example.gestiGastillos.model.transactions;

public enum TransactionCategory {
    //
    ENTRETAIMENT("entretamient", "entretenimiento"),
    EDUCATION("education", "educacion");


    private String englishTransactionCategory;
    private String spanishTransactionCategory;

    TransactionCategory(String englishTransactionCategory, String spanishTransactionCategory){
        this.englishTransactionCategory = englishTransactionCategory;
        this.spanishTransactionCategory = spanishTransactionCategory;
    }

    public static TransactionCategory fromString(String userTransaction){
        for(TransactionCategory transactionCategory : TransactionCategory.values()){
            if(userTransaction.equalsIgnoreCase(transactionCategory.englishTransactionCategory)){
                return transactionCategory;
            }
        }
        return null;
    }

    public static TransactionCategory fromSpanish(String userTransaction){
        for(TransactionCategory transactionCategory : TransactionCategory.values()){
            if(userTransaction.equalsIgnoreCase(transactionCategory.spanishTransactionCategory)){
                return transactionCategory;
            }
        }
        return null;
    }
}
