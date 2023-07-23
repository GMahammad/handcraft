package com.ecommerce.handcraft.response;

import java.util.List;

public class JwtResponse {
    private final List<String> roles;
    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;
    private String firstName;

    public JwtResponse(String accessToken, Long id, String email, List<String> roles,String firstName) {
        this.token = accessToken;
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.roles = roles;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getRoles() {
        return roles;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
