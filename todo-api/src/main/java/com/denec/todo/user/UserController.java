package com.denec.todo.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public Iterable<User> getUsers() {
        return userService.findAll();
    }

    @PostMapping("/user/{id}")
    public User addUser(@RequestBody User newUser) {
        return userService.add(newUser);
    }
}
