package com.scout.service;

import com.scout.model.User;
import com.scout.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    public List<User> findByRole(User.Role role) {
        return userRepository.findByRole(role);  // Using the repository to find users by role
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
