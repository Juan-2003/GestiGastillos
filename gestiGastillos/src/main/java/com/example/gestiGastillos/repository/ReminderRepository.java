package com.example.gestiGastillos.repository;

import com.example.gestiGastillos.model.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {
    @Query(nativeQuery = true, value = """
        SELECT * FROM reminder WHERE reminder.user_id = :userId
    """)
    List<Reminder> getReminderByUser(@Param("userId") Long userId);
}
