package com.denec.todo.task;

import java.util.List;

import org.springframework.stereotype.Service;

import com.denec.todo.user.User;
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

    public Task addTask(Task task) {
        User currentUser = userService.getCurrentUser();
        task.setUser(currentUser);
        return taskRepository.save(task);
    }

    public Task putTask(Task task, Long id) {
        var taskSearchResult = taskRepository.findById(id);
        
        if (taskSearchResult.isEmpty()) {
            task.setUser(userService.getCurrentUser());
            taskRepository.save(task);
        }

        Task existingTask = taskSearchResult.get();
        
        if (!existingTask.getUser().getId().equals(userService.getCurrentUser().getId())) {
            throw new RuntimeException("wrong user");
        }

        existingTask.setText(task.getText());

        return taskRepository.save(existingTask);
    }

    public void deleteAll() {
        User currentUser = userService.getCurrentUser();

        List<Long> idsToDelete = currentUser.getTodoTasks().stream().map((task) -> task.getId()).toList();

        taskRepository.deleteAllById(idsToDelete);
    }
}
