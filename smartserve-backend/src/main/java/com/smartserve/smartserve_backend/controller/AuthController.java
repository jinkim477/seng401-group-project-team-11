package com.smartserve.smartserve_backend.controller;

import com.smartserve.smartserve_backend.model.User;
import com.smartserve.smartserve_backend.repository.UserRepository;
import com.smartserve.smartserve_backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
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

    // Registration endpoint
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent() ||
            userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "User already exists";
        }
        // Encrypt the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        // Send registration email
        emailService.sendRegistrationEmail(
            user.getEmail(), 
            "🎉 Welcome to SmartServe " + user.getUsername(), 
            "Hi " + user.getUsername() + ",\n\n" +
            "Thank you for registering with SmartServe! We're excited to have you on board. 🚀" + "\n\n" +
            "With SmartServe, you can:\n" + 
            "✅ Generate meal plans based on your dietary preferences\n" +
            "✅ Get personalized nutrition recommendations\n" +
            "✅ Explore a variety of delicious recipes" + "\n\n" +
            "Next Steps:\n" +
            "1️⃣ Log in to your account at the SmartServe website\n" +
            "2️⃣ Set up your meal preferences\n" +
            "3️⃣ Start generating your first meal plan!" + "\n\n" +
            "Need any help? Feel free to reply to this email or visit our website for more information." + "\n\n" +
            "Happy meal planning! 🍽️\n\n" +
            "Best,\n" +
            "The SmartServe Team"
        );
        return "User registered successfully";
    }

    // Login endpoint (for demonstration purposes)
    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        return userRepository.findByUsername(user.getUsername())
            .filter(u -> passwordEncoder.matches(user.getPassword(), u.getPassword()))
            .map(u -> "Login successful")
            .orElse("Invalid credentials");
    }
}
