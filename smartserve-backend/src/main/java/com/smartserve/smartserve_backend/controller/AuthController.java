package com.smartserve.smartserve_backend.controller;

import com.smartserve.smartserve_backend.model.User;
import com.smartserve.smartserve_backend.repository.GeneratedMealPlanRepository;
import com.smartserve.smartserve_backend.repository.UserRepository;
import com.smartserve.smartserve_backend.service.EmailService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GeneratedMealPlanRepository mealPlanRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        List<Long> deletedMealPlans = mealPlanRepository.deleteByUserId(userId);
        userRepository.deleteById(userId);
        return ResponseEntity.ok("User deleted successfully along with " + deletedMealPlans.size() + " meal plans");
    }

    // Registration endpoint
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent() ||
                userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("User already exists");
        }
        // Encrypt the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        // Prepare enhanced HTML content with inline CSS
        String htmlContent = "<div style='font-family: Helvetica, Arial, sans-serif; margin: 0; padding: 20px; background-color: #f7f7f7; color: #333;'>"
                +
                "<h2 style='color: #2A7DB1; text-align: center;'>Welcome to SmartServe, " + user.getUsername()
                + "!</h2>" +
                "<p style='font-size: 16px;'>Hi " + user.getUsername() + ",</p>" +
                "<p>Thank you for registering with SmartServe! We're excited to have you on board. 🚀</p>" +
                "<div style='padding: 18px; background-color: white; border: 1px solid #ddd;'>" +
                "<h4>What you can do with SmartServe:</h4>" +
                "<ul>" +
                "<li><strong>Generate meal plans</strong> based on your dietary preferences</li>" +
                "<li><strong>Get personalized nutrition recommendations</strong></li>" +
                "<li><strong>Explore a variety of delicious recipes</strong></li>" +
                "</ul>" +
                "<h4>Next Steps:</h4>" +
                "<ol>" +
                "<li>Log in to your account at the <a href='https://smartserve.com/login' style='color: #2A7DB1; text-decoration: none;'>SmartServe website</a>.</li>"
                +
                "<li>Set up your meal preferences.</li>" +
                "<li>Start generating your first meal plan!</li>" +
                "</ol>" +
                "</div>" +
                "<p>If you need any help, feel free to <a href='mailto:smartserve401@smartserve.com' style='color: #2A7DB1; text-decoration: none;'>reply to this email</a> or visit our <a href='https://smartserve.com/support' style='color: #2A7DB1; text-decoration: none;'>website</a> for more information.</p>"
                +
                "<p>Happy meal planning! 🍽️</p>" +
                "<p style='text-align: center; font-size: 14px; color: #666;'>Best regards,<br>The SmartServe Team</p>"
                +
                "</div>";

        // Send registration email with enhanced HTML content
        emailService.sendRegistrationEmail(user.getEmail(), "🎉 Welcome to SmartServe " + user.getUsername(),
                htmlContent);

        return ResponseEntity.ok("User registered successfully");
    }

    // Login endpoint (for demonstration purposes)
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
        Optional<User> optionalUser = userRepository.findByUsername(user.getUsername())
                .filter(u -> passwordEncoder.matches(user.getPassword(), u.getPassword()));

        if (optionalUser.isPresent()) {
            User u = optionalUser.get();
            Map<String, Object> response = new HashMap<>();
            response.put("id", u.getId());
            response.put("username", u.getUsername());
            response.put("message", "Login successful");

            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}
