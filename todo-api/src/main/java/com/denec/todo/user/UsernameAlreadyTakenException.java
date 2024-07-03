package com.denec.todo.user;

class UsernameAlreadyTakenException extends RuntimeException {
    UsernameAlreadyTakenException(String username) {
        super("name " + username + " is already taken");
    }
}
