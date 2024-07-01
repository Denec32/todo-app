package com.denec.todo.task;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/task")
    public Iterable<Task> getTasks() {
        return taskService.findAll();
    }

    @DeleteMapping("/task/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteById(id);
    } 
}