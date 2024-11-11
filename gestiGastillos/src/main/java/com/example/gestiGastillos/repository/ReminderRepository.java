package com.example.gestiGastillos.repository;

import com.example.gestiGastillos.model.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {
}
