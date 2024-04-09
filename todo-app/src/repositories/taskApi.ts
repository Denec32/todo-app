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

    addTask(newTask: Task): Promise<Task> {
        return fetch(this.taskEndpointLink, {
            method: 'POST',
            headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        .then(res => res.json())
        .then(res => {
            return res as Task
        });
    }

    deleteTask(id: number) {
        return fetch(this.taskEndpointLink + '/' + id, {
            method: 'DELETE',
        });
    }
}

export const taskApi = new TaskApi();