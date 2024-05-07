package com.denec.todo.task;

import org.springframework.stereotype.Service;

import com.denec.todo.task.exceptions.TaskNotFoundException;

@Service
public class TaskService {

    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task findById(Long id) {
        return taskRepository.findById(id)
        .orElseThrow(() -> new TaskNotFoundException(id));
    }

    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }

    public Iterable<Task> findAll() {
        return taskRepository.findAll();
    }

    public Task add(Task newTask) {
        return taskRepository.save(newTask);
    }

    public Task put(Task newTask, Long id) {
        return taskRepository.findById(id)
        .map(task -> {
            task.setText(newTask.getText());
            return taskRepository.save(task);
        })
        .orElseGet(() -> {
            newTask.setId(id);
            return taskRepository.save(newTask);
        });
    }
}
