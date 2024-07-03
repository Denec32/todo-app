package com.denec.todo.task;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/task")
    Iterable<Task> getTasks() {
        return taskService.findAll();
    }

    @PostMapping("/task")
    Task addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    @DeleteMapping("/task/{id}")
    void deleteTask(@PathVariable Long id) {
        taskService.deleteById(id);
    } 

    @DeleteMapping("/task")
    void deleteTasks() {
        taskService.deleteAll();
    } 

    @PutMapping("/task/{id}")
    Task putTask(@RequestBody Task task, @PathVariable Long id) {
        return taskService.putTask(task, id);
    }
}