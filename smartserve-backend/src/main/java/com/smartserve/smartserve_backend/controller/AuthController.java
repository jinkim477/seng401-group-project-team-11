package com.smartserve.smartserve_backend.controller;

import com.smartserve.smartserve_backend.model.User;
import com.smartserve.smartserve_backend.repository.UserRepository;
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
