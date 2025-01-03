package com.knowit.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.entities.User;
import com.knowit.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepo;
	
	public List<User> getAllUsers() {
        return userRepo.findAll();
    }
	
	public User saveUser(User user) {
        return userRepo.save(user);
    }
	
	public User getUser(String email,String password) {
		return userRepo.findByEmailandPassword(email, password);
	}

}
