package com.smartserve.smartserve_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartserve.smartserve_backend.model.GeneratedMealPlan;
import com.smartserve.smartserve_backend.model.User;
import com.smartserve.smartserve_backend.repository.GeneratedMealPlanRepository;

@Service
public class GeneratedMealPlanService {

    @Autowired
    private GeneratedMealPlanRepository generatedMealPlanRepository;

    // Save AI Response
    public GeneratedMealPlan saveGeneratedMealPlan(User user, String response) {
        GeneratedMealPlan mealPlan = new GeneratedMealPlan(user, response, LocalDateTime.now());
        return generatedMealPlanRepository.save(mealPlan);
    }

    // Retrieve AI responses for a user
    public List<GeneratedMealPlan> getUserMealPlans(Long userId) {
        return generatedMealPlanRepository.findByUserId(userId);
    }
}
