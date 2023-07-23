package com.ecommerce.handcraft.controllers;


import com.ecommerce.handcraft.entity.User;
import com.ecommerce.handcraft.repository.UserRepository;
import com.ecommerce.handcraft.requests.LoginRequest;
import com.ecommerce.handcraft.requests.RegistrationRequest;
import com.ecommerce.handcraft.response.ResponseHandler;
import com.ecommerce.handcraft.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("api/v1/auth")
public class UserController {

@Autowired
private UserRepository userRepository;
private UserService userService;


    public UserController(UserRepository userRepository,UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> signIn(@Valid @RequestBody LoginRequest loginRequest) throws Exception{
        try {
            return userService.loginUser(loginRequest);
        }catch (Exception e){
            return ResponseHandler.generateResponse("Entered email or password is wrong!", HttpStatus.MULTI_STATUS,null);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody RegistrationRequest registrationRequest) throws Exception{
          return userService.addUser(registrationRequest);
    }
}
