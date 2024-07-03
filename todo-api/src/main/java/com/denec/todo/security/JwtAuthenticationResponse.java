package com.denec.todo.security;

class JwtAuthenticationResponse {

    private String token;

    JwtAuthenticationResponse(String token) {
        this.token = token;
    }

    String getToken() {
        return this.token;
    }
}
