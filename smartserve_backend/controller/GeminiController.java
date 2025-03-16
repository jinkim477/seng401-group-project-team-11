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
@CrossOrigin(origins = "*") // adjust this for security in production
public class GeminiController {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private static final String GEMINI_API_URL =
            "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/generate")
    public ResponseEntity<String> generateMealPlan(@RequestBody MealPlanRequest request) {
        try {
            // 1. Build prompt from input
            String prompt = buildPrompt(request);

            // 2. Set up Gemini API payload
            Map<String, Object> requestBody = new HashMap<>();
            Map<String, String> contentPart = Map.of("text", prompt);
            Map<String, Object> content = Map.of("parts", List.of(contentPart));
            requestBody.put("contents", List.of(content));

            // 3. Send request
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            UriComponentsBuilder uriBuilder = UriComponentsBuilder
                    .fromHttpUrl(GEMINI_API_URL)
                    .queryParam("key", geminiApiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    uriBuilder.toUriString(), entity, Map.class);

            // 4. Extract response
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
            Map<String, Object> firstCandidate = candidates.get(0);
            Map<String, Object> responseContent = (Map<String, Object>) firstCandidate.get("content");
            List<Map<String, String>> parts = (List<Map<String, String>>) responseContent.get("parts");
            String generatedText = parts.get(0).get("text");

            return ResponseEntity.ok(generatedText);
        } catch (Exception e) {
            e.printStackTrace(); // for development
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    private String buildPrompt(MealPlanRequest req) {
        return String.format("""
            Create a meal plan for %d day(s) with a %s diet. 
            The plan should support the following goals: %s. 
            Return meals organized by breakfast, lunch, and dinner for each day.
            """, req.getDays(), req.getDiet(), req.getGoals());
    }
}
