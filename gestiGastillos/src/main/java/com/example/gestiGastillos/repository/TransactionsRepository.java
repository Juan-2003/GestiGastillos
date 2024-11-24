package com.example.gestiGastillos.repository;

import com.example.gestiGastillos.model.transactions.TransactionType;
import com.example.gestiGastillos.model.transactions.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Long> {
    List<Transactions> findAllByType(TransactionType transactionType);

    @Query(value= """
        SELECT transactions.*, transactions.id AS transactions_id
        FROM Transactions
        INNER JOIN card ON transactions.card_id = card.id
        INNER JOIN user ON card.user_id = user.id 
        WHERE strftime('%m', transactions.date) =:month 
        AND transactions.type = 'INCOME' 
        AND user.id = :userId
    """,  nativeQuery = true)
    List<Transactions> getIncomesByMonth(String month, @Param("userId") Long userId);

    @Query(value = """      
        SELECT transactions.*, transactions.id AS transactions_id  
        FROM Transactions
        INNER JOIN card ON transactions.card_id = card.id
        INNER JOIN user ON card.user_id = user.id 
        WHERE strftime('%m', transactions.date) =:month 
        AND user.id = :userId
        AND transactions.type = 'EXPENSE'
        """, nativeQuery = true)
    List<Transactions> getExpenseByMonth(String month,  @Param("userId") Long userId);
}
