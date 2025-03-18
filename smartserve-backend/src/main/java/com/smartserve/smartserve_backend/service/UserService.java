package com.smartserve.smartserve_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.smartserve.smartserve_backend.model.User;
import com.smartserve.smartserve_backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        // Add hashing for password here before saving
        return userRepository.save(user);
    }

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).orElse(null) != null;
    }
}
