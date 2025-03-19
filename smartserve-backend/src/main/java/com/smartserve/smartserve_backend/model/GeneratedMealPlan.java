package com.smartserve.smartserve_backend.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "generated_meal_plans")
public class GeneratedMealPlan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String response;

    @Column(nullable = false)
    private LocalDateTime createdTime;

    public GeneratedMealPlan(User user, String response, LocalDateTime createdTime) {
        this.user = user;
        this.response = response;
        this.createdTime = createdTime;
    }
}
