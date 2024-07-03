package com.denec.todo.task;

public class TaskNotOwnedByUserException extends RuntimeException {
    public TaskNotOwnedByUserException(Long taskId) {
        super("Current user doesn't own task with id " + taskId);
    }
}
