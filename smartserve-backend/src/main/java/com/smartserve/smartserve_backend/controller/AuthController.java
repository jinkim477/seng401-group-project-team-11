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
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestParam Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    
        // Prepare HTML content for the email
        String htmlContent = "<div style='font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #494949; color: #333;'>"
                + "<h2 style='color: #4CAF50; text-align: center;'>Account Deletion Confirmation</h2>"
                + "<p style='font-size: 16px;'>Hello " + user.getUsername() + ",</p>"
                + "<p>Your SmartServe account has been permanently deleted. We're sorry to see you go.</p>"
                + "<p>If this was a mistake or you did not request account deletion, please contact our support immediately.</p>"
                + "<p style='text-align: center; font-size: 14px; color: #666;'>Thank you for using SmartServe. We hope to serve you again in the future.</p>"
                + "<p style='text-align: center; font-size: 14px; color: #666;'>Best regards,<br>The SmartServe Team</p>"
                + "</div>";
    
        // Send the email
        emailService.sendRegistrationEmail(user.getEmail(), "SmartServe Account Deletion Confirmation", htmlContent);
    
        // Proceed to delete the user
        userRepository.delete(user);
        return ResponseEntity.ok("Deleted Successfully");
    }
    
    // Registration endpoint
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        // Check if the username is already taken
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Username Taken"));
        }

        // Check if the email is already associated with an account
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "This email is already registered to an account"));
        }

        // Encrypt the password and save the user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        // Email content matching the frontend style
        String htmlContent = "<div style='font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #494949; color: #333;'>"
                + "<h2 style='color: #4CAF50; text-align: center;'>Welcome to SmartServe, " + user.getUsername()
                + "!</h2>"
                + "<p style='font-size: 16px;'>Hello " + user.getUsername() + ",</p>"
                + "<p>Thank you for registering with SmartServe! We're thrilled to have you join us. 🌱</p>"
                + "<div style='padding: 18px; background-color: #e2ded1; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>"
                + "<h4>Here’s what you can do:</h4>"
                + "<ul>"
                + "<li><strong>Create and customize meal plans</strong> tailored to your dietary needs.</li>"
                + "<li><strong>Access detailed nutritional information</strong> to stay on top of your health.</li>"
                + "<li><strong>Explore and save your favorite recipes.</strong></li>"
                + "</ul>"
                + "<h4>Get Started:</h4>"
                + "<ol>"
                + "<li>Log in to your account <a href='https://smartserveai.vercel.app/login' style='color: #4CAF50; text-decoration: none;'>here</a>.</li>"
                + "<li>Visit your Dashboard to set your dietary preferences.</li>"
                + "<li>Start planning and tracking your meals with ease!</li>"
                + "</ol>"
                + "</div>"
                + "<p>Need assistance? You can always reach out to us by <a href='mailto:smartserve401@smartserve.com' style='color: #4CAF50; text-decoration: none;'>email</a> or visit our <a href='https://smartserveai.vercel.app/home style='color: #4CAF50; text-decoration: none;'>Support Center</a>.</p>"
                + "<p style='text-align: center; font-size: 14px; color: #666;'>Happy meal planning! 🍽️</p>"
                + "<p style='text-align: center; font-size: 14px; color: #666;'>Warm regards,<br>The SmartServe Team</p>"
                + "</div>";

        // Send registration email with enhanced HTML content
        emailService.sendRegistrationEmail(user.getEmail(), "Welcome to SmartServe, " + user.getUsername() + " 🎉",
                htmlContent);

        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    // Login endpoint (for demonstration purposes)
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
        Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());
        if (optionalUser.isPresent()) {
            User u = optionalUser.get();
            if (passwordEncoder.matches(user.getPassword(), u.getPassword())) {
                Map<String, Object> response = new HashMap<>();
                response.put("id", u.getId());
                response.put("username", u.getUsername());
                response.put("message", "Login successful");
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not found"));
        }
    }
}
