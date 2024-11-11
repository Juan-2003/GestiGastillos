package com.example.gestiGastillos.validation.Transactions.PostValidations;

public interface TransactionValidator<T> {
    void validation(T dto);
}
