package com.smartserve.smartserve_backend.controller;

import com.smartserve.smartserve_backend.dto.MealPlanRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;

@RestController
@RequestMapping("/gemini")
// @CrossOrigin(origins = "*") // Uncomment for frontend testing, adjust in
// production
public class GeminiController {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/generate")
    public ResponseEntity<String> generateMealPlan(@RequestBody MealPlanRequest request) {
        try {
            System.out.println("🔹 Processing Meal Plan Request...");
            System.out.println("📌 API Key Used: " + (geminiApiKey != null ? "Set" : "MISSING"));
            System.out.println("➡️ Request Data: " + request);

            // Ensure API Key is provided
            if (geminiApiKey == null || geminiApiKey.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"API Key is missing\"}");
            }

            // 1. Construct prompt dynamically
            String prompt = buildPrompt(request);

            // 2. Set up Gemini API request payload
            Map<String, Object> requestBody = new HashMap<>();
            Map<String, String> contentPart = Map.of("text", prompt);
            Map<String, Object> content = Map.of("parts", List.of(contentPart));
            requestBody.put("contents", List.of(content));

            // 3. Prepare request headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            UriComponentsBuilder uriBuilder = UriComponentsBuilder
                    .fromUriString(GEMINI_API_URL)
                    .queryParam("key", geminiApiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // 4. Send request to Gemini API
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    uriBuilder.toUriString(), entity, Map.class);

            // 5. Extract response data safely
            if (response.getBody() == null || !response.getBody().containsKey("candidates")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("{\"error\": \"Invalid response from Gemini API\"}");
            }

            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
            if (candidates == null || candidates.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("{\"error\": \"No content generated\"}");
            }

            Map<String, Object> firstCandidate = candidates.get(0);
            Map<String, Object> responseContent = (Map<String, Object>) firstCandidate.get("content");
            List<Map<String, String>> parts = (List<Map<String, String>>) responseContent.get("parts");

            String generatedText = parts.get(0).get("text");

            // Remove markdown JSON formatting if it exists
            generatedText = generatedText.replaceAll("^```json\\s*", "").replaceAll("```$", "").trim();

            System.out.println("✅ Generated Meal Plan: " + generatedText);
            return ResponseEntity.ok(generatedText);

        } catch (Exception e) {
            e.printStackTrace(); // Debugging logs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Server Error: " + e.getMessage() + "\"}");
        }
    }

    private String buildPrompt(MealPlanRequest req) {
        return String.format("""
                Create a detailed meal plan for %d day(s) using a %s diet.
                The user has the following profile:
                - Height: %d cm
                - Weight: %d kg
                - Sex: %s
                - Activity Level: %s
                - Price Range: Up to $%d per meal
                - Meal Prep Time Limit: %d minutes
                - Preferred Meal Times: %s
                - Dietary Goal: %s
                - Inclusions: %s
                - Exclusions: %s
                - Allergies: %s

                The plan should support the following goals: %s.
                Nutritional guidelines:
                - Calorie Limit: %d kcal
                - Protein Requirement: %d grams
                - Nutrients:
                    - Potassium: %d mg
                    - Phosphorus: %d mg
                    - Vitamins: %d mg
                    - Calcium: %d mg
                    - Sodium: %d mg

                Return meals structured by breakfast, lunch, and dinner for each day.
                Your response must be in JSON format with the following structure:
                {
                    "day": {
                        "meal": {
                            "name": "Meal Name",
                            "ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
                            "instructions": "Cooking instructions",
                            "prep_time": "Preparation time",
                            "macros": {
                                "calories": "Calories",
                                "protein": "Protein",
                                "carbs": "Carbs",
                                "fat": "Fat"
                            }
                        }
                    }
                }
                """,
                req.getDays(),
                req.getSelectedDiets().isEmpty() ? "default" : String.join(", ", req.getSelectedDiets()),
                req.getHeight(),
                req.getWeight(),
                req.getSex(),
                req.getActivityLevel().isEmpty() ? "Did not specify" : req.getActivityLevel(),
                req.getPriceRange(),
                req.getPrepTime(),
                req.getMealTimes().isEmpty() ? "Anytime" : String.join(", ", req.getMealTimes()),
                req.getDietaryGoal().isEmpty() ? "No preference" : req.getDietaryGoal(),
                req.getInclusions().isEmpty() ? "No preferences" : req.getInclusions(),
                req.getExclusions().isEmpty() ? "None" : req.getExclusions(),
                req.getAllergies().isEmpty() ? "None" : req.getAllergies(),
                req.getSelectedGoals().isEmpty() ? "None" : String.join(", ", req.getSelectedGoals()),
                req.getCalorieLimit(),
                req.getProteinRequirement(),
                req.getNutrients().get("potassium"),
                req.getNutrients().get("phosphorus"),
                req.getNutrients().get("vitamins"),
                req.getNutrients().get("calcium"),
                req.getNutrients().get("sodium"));
    }
}
