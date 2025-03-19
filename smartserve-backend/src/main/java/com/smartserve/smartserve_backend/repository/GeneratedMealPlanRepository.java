package com.smartserve.smartserve_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.smartserve.smartserve_backend.model.GeneratedMealPlan;
import com.smartserve.smartserve_backend.model.User;

@Repository
public interface GeneratedMealPlanRepository extends JpaRepository<GeneratedMealPlan, Long> {
    List<GeneratedMealPlan> findByUserId(Long userId);
}
