package com.denec.todo.task;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.denec.todo.user.User;


@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
    List<Task> getByUser(User user);
}
