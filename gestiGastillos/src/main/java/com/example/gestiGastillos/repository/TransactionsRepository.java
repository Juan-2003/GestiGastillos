package com.example.gestiGastillos.repository;

import com.example.gestiGastillos.model.transactions.TransactionType;
import com.example.gestiGastillos.model.transactions.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Long> {
    List<Transactions> findAllByType(TransactionType transactionType);
}
