package com.denec.todo.security;

class SignInRequest {

    private String username;
    private String password;

    String getUsername() {
        return this.username;
    }

    void setUsername(String username) {
        this.username = username;
    }

    String getPassword() {
        return this.password;
    }

    void setPassword(String password) {
        this.password = password;
    }
}
