import type { Task } from '../types/Task';

class TaskApi {
    taskEndpointLink: string = 'http://localhost:8080/task';

    getTasks(): Promise<Task[]> {
        return fetch(this.taskEndpointLink)
        .then(res => res.json())
        .then(res => {
          return res as Task[]
        })
    }

    addTask(newTask: Task): Task {
        return newTask;
    }
}

export const taskApi = new TaskApi();