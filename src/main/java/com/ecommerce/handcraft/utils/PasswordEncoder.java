package com.ecommerce.handcraft.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoder {
    private BCryptPasswordEncoder encoder;

    public PasswordEncoder() {
        this.encoder = new BCryptPasswordEncoder();
    }

    public String encoder(String password){
        return encoder.encode(password);
    }
    public boolean matches(String rawPassword, String encodedPassword) {
        return encoder.matches(rawPassword, encodedPassword);
    }
}
