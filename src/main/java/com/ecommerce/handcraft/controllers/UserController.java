package com.ecommerce.handcraft.controllers;


import com.ecommerce.handcraft.entity.Roles;
import com.ecommerce.handcraft.entity.RolesEnum;
import com.ecommerce.handcraft.entity.User;
import com.ecommerce.handcraft.repository.RoleRepository;
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
import java.util.HashSet;
import java.util.Set;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("api/v1/auth")
public class UserController {

@Autowired
private UserRepository userRepository;
private UserService userService;
private RoleRepository roleRepository;

    public UserController(UserRepository userRepository, UserService userService, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.roleRepository = roleRepository;
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

    @DeleteMapping("/admin/deleteuser")
    public ResponseEntity<?> deleteUser(@Valid @RequestParam Long userId) throws Exception {
        try {
            User user = userRepository.findById(userId).orElse(null);
            if (user != null) {
                for (Roles role : user.getRoles()) {
                    role.getUsers().remove(user);
                }
                user.getRoles().clear();
                userRepository.save(user);
                userRepository.delete(user);
            }
            return ResponseHandler.generateResponse("User deleted successfully!", HttpStatus.OK, null);
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }
    }

    @PutMapping("/admin/updaterole")
    public ResponseEntity<?> updateUserRole(@RequestParam Long userId) throws Exception{
        try {
            userService.updateUserRole(userId);
            return ResponseHandler.generateResponse("User role changed as Moderator",HttpStatus.OK, null);
        }catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(),HttpStatus.MULTI_STATUS,null);
        }
    }
}
