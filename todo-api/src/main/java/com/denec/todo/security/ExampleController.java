package com.denec.todo.security;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/example")
public class ExampleController {

    @GetMapping
    public String example() {
        return "Hello, world!";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('admin')")
    public String exampleAdmin() {
        return "Hello, admin!";
    }
}