package com.denec.todo.task;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.denec.todo.task.exceptions.TaskNotFoundException;

@RestController
public class TaskController {
    private final TaskRepository repository;

    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/task")
    public List<Task> getTasks() {
        return repository.findAll();
    }

    @GetMapping("/task/{id}")
    public Task getTask(@PathVariable Long id) {
        return repository.findById(id)
        .orElseThrow(() -> new TaskNotFoundException(id));
    }

    @PostMapping("/task/")
    public Task addTask(@RequestBody Task newTask) {
        return repository.save(newTask);
    }

    public Task putTask(@RequestBody Task newTask, @PathVariable Long id) {
        return repository.findById(id)
        .map(task -> {
            task.setText(newTask.getText());
            return repository.save(task);
        })
        .orElseGet(() -> {
            newTask.setId(id);
            return repository.save(newTask);
        });
    }

    @DeleteMapping("/task/{id}")
    public void removeTask(@PathVariable Long id) {
        repository.deleteById(id);
    }

}
