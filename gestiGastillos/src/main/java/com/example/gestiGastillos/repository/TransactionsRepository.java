package com.example.gestiGastillos.repository;

import com.example.gestiGastillos.model.transactions.TransactionType;
import com.example.gestiGastillos.model.transactions.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Long> {
    List<Transactions> findAllByType(TransactionType transactionType);

    @Query(value = "SELECT * FROM Transactions WHERE strftime('%m', transactions.date) =:month AND transactions.type = 'INCOME'", nativeQuery = true)
    List<Transactions> getIncomesByMonth(String month);

    @Query(value = "SELECT * FROM Transactions WHERE strftime('%m', transactions.date) =:month AND transactions.type = 'EXPENSE'", nativeQuery = true)
    List<Transactions> getExpenseByMonth(String month);
}
