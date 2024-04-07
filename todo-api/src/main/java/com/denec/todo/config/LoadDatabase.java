package com.denec.todo.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.denec.todo.task.Task;
import com.denec.todo.task.TaskRepository;

@Configuration
public class LoadDatabase {
    @Bean
    CommandLineRunner initDatabase(TaskRepository repository) {
        return args -> {
            repository.save(new Task("get up"));
            repository.save(new Task("play puter vidya"));
            repository.save(new Task("go to sleep"));
        };
    }
}
