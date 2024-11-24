package com.example.gestiGastillos.repository;

import com.example.gestiGastillos.model.Saving;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavingRepository extends JpaRepository<Saving, Long> {
    @Query(nativeQuery = true, value = """
        SELECT * FROM saving WHERE saving.user_id = :user_id
    """)
    List<Saving> getSavingsByUser(@Param("user_id") Long userId);
}
