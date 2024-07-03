package com.denec.todo.task;

public class TaskNotOwnedByUserException extends RuntimeException {
    TaskNotOwnedByUserException(Long taskId) {
        super("Current user doesn't own task with id " + taskId);
    }
}
