package com.denec.todo.security;

public class JwtAuthenticationResponse {
    private String token;


    public JwtAuthenticationResponse(String token) {
        this.token = token;
    }


    public String getToken() {
        return this.token;
    }
}
