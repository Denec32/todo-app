package com.denec.todo.security;

class SignUpRequest {

    private String username;
    private String password;
    private String passwordConfirmation;

    SignUpRequest() {
    }

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

    String getPasswordConfirmation() {
        return this.passwordConfirmation;
    }

    void setPasswordConfirmation(String passwordConfirmation) {
        this.passwordConfirmation = passwordConfirmation;
    }
}
