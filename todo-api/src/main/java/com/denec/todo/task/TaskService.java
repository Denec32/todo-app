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

    public Iterable<Task> findAll() {
        return taskRepository.getByUser(userService.getCurrentUser());
    }

    public void deleteById(Long id) {
        var taskSearchResult = taskRepository.findById(id);

        if (taskSearchResult.isEmpty()) {
            throw new RuntimeException("no task found");
        }

        Task taskToDelete = taskSearchResult.get();

        if (!taskToDelete.getUser().getId().equals(userService.getCurrentUser().getId())) {
            throw new RuntimeException("wrong user");
        }

        taskRepository.deleteById(id);
    }
}
