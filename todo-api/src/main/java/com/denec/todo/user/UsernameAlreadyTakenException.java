package com.denec.todo.user;

public class UsernameAlreadyTakenException extends RuntimeException {
    public UsernameAlreadyTakenException(String username) {
        super("name " + username + " is already taken");
    }
}
