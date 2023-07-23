package com.ecommerce.handcraft.services;

import com.ecommerce.handcraft.entity.Roles;
import com.ecommerce.handcraft.entity.RolesEnum;
import com.ecommerce.handcraft.entity.User;
import com.ecommerce.handcraft.repository.RoleRepository;
import com.ecommerce.handcraft.repository.UserRepository;
import com.ecommerce.handcraft.requests.LoginRequest;
import com.ecommerce.handcraft.requests.RegistrationRequest;
import com.ecommerce.handcraft.response.JwtResponse;
import com.ecommerce.handcraft.response.ResponseHandler;
import com.ecommerce.handcraft.utils.JwtUtils;
import com.ecommerce.handcraft.utils.PasswordEncoder;
import com.ecommerce.handcraft.utils.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {
    private final PasswordEncoder passwordEncoder = new PasswordEncoder();
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Autowired
    public UserService(RoleRepository rolesRepository, UserRepository userRepository, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.roleRepository = rolesRepository;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public ResponseEntity<Object> addUser(RegistrationRequest registrationRequest) throws Exception {
        try {
            if (!registrationRequest.getEmail().isEmpty() &&
                    !registrationRequest.getFirstName().isEmpty() &&
                    !registrationRequest.getLastName().isEmpty() &&
                    !registrationRequest.getPassword().isEmpty()) {
                if (userRepository.existsByEmail(registrationRequest.getEmail())) {
                    throw new Exception("Email has  been already entered!");
                } else {
                    String encodedPassword;
                    if (registrationRequest.getPassword().length() >= 6) {
                        encodedPassword = passwordEncoder.encoder(registrationRequest.getPassword());
                    } else {
                        return ResponseHandler.generateResponse("Password length should be more than 6 characters!", HttpStatus.MULTI_STATUS, null);
                    }
                    User newUser = new User(registrationRequest.getFirstName(), registrationRequest.getLastName(), registrationRequest.getEmail(), encodedPassword);
                    Set<String> strRoles = registrationRequest.getRole();
                    Set<Roles> roles = new HashSet<>();

                    if (strRoles == null) {
                        try {
                            Roles userRole = roleRepository.findByRoleName(RolesEnum.USER)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(userRole);
                        } catch (RuntimeException e) {
                            return ResponseHandler.generateResponse("Role is not found!", HttpStatus.MULTI_STATUS, null);
                        }

                    } else {
                        strRoles.forEach(role -> {
                            switch (role) {
                                case "admin":
                                    Roles adminRole = roleRepository.findByRoleName(RolesEnum.ADMIN)
                                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                                    roles.add(adminRole);
                                    break;

                                case "mod":
                                    Roles modRole = roleRepository.findByRoleName(RolesEnum.MODERATOR)
                                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                                    roles.add(modRole);

                                    break;
                                default:
                                    Roles userRole = roleRepository.findByRoleName(RolesEnum.USER)
                                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                                    roles.add(userRole);
                            }

                        });
                    }
                    newUser.setRoles(roles);

                    for (Roles role : roles) {
                        role.getUsers().add(newUser);
                    }
                    try {

                        userRepository.save(newUser);
                        return ResponseHandler.generateResponse("Registered successfully!", HttpStatus.OK, null);
                    } catch (Exception e) {
                        return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);
                    }
                }
            } else {
                throw new Exception("All fields should be entered!");
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);

        }

    }

    public ResponseEntity<Object> loginUser(@Valid @RequestBody LoginRequest loginRequest) throws Exception {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseHandler.generateResponse("Logged in successfully", HttpStatus.OK, new JwtResponse(jwt, userDetails.getId(),  userDetails.getEmail(), roles, userDetails.getFirstName()));
    }
}
