package com.knowit.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.entities.User;
import com.knowit.entities.UserLogin;
import com.knowit.services.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
	@Autowired
	UserService userSer;
	
	@GetMapping("/getalluser")
	public List<User> getallusers() {
		return userSer.getAllUsers();
	}
	
	@PostMapping("/login")
	public User loginUser(@RequestBody UserLogin user) {

		
		return userSer.getUser(user.getEmail(), user.getPassword());
	}
	
	
    
    @PutMapping("/register")
    public User getregiuster(@RequestBody User user){
        return userSer.saveUser(user);
    }
    
	

}
