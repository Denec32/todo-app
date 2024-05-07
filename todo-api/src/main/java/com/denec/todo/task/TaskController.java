package com.denec.todo.task;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("/task/{id}")
    public Task getTask(@PathVariable Long id) {
        return taskService.findById(id);
    }

    @PostMapping("/task")
    public Task addTask(@RequestBody Task newTask) {
        return taskService.add(newTask);
    }

    @PutMapping("/task/{id}")
    public Task putTask(@RequestBody Task newTask, @PathVariable Long id) {
        return taskService.put(newTask, id);
    }

    @DeleteMapping("/task/{id}")
    public void removeTask(@PathVariable Long id) {
        taskService.deleteById(id);
    }

}
