package com.smartserve.smartserve_backend.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class MealPlanRequest {
    private String displayName;
    private List<String> mealTimes;
    private String dietaryGoal;
    private String activityLevel;
    private List<String> selectedDiets;
    private boolean otherDiet;
    private String otherDietDetails;
    private String inclusions;
    private String allergies;
    private String exclusions;

    // User Options
    private int weight;
    private int height;
    private String sex;
    private int priceRange;
    private int prepTime;

    // Customization
    private List<String> selectedGoals;
    private int calorieLimit;
    private int proteinRequirement;
    private Map<String, Integer> nutrients;
    private String mealScope;
    private int days; // Computed from frontend selection
}
