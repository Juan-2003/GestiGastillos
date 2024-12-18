package com.example.gestiGastillos.repository;

import com.example.gestiGastillos.model.card.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
}
