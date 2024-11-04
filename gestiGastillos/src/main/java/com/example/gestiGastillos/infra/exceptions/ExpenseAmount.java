package com.example.gestiGastillos.infra.exceptions;

public class ExpenseAmount extends RuntimeException {
    public ExpenseAmount(String message) {
        super(message);
    }
}
