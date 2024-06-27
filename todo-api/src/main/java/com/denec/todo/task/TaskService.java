package com.denec.todo.task;

import org.springframework.stereotype.Service;

import com.denec.todo.task.exceptions.TaskNotFoundException;
import com.denec.todo.user.UserService;

@Service
public class TaskService {

    private TaskRepository taskRepository;
    private UserService userService;

    public TaskService(TaskRepository taskRepository, UserService userService) {
        this.taskRepository = taskRepository;
        this.userService = userService;
    }

    public Iterable<Task> findByUser() {
        return taskRepository.getByUser(userService.getCurrentUser());
    }
}
