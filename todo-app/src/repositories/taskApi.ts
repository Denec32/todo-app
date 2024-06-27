import type { Task } from '../types/Task';
import { cookieApi } from './cookieApi';

class TaskApi {
    taskEndpointLink: string = 'http://localhost:8080/task';

    getTasks(): Promise<Task[]> {
        return fetch(this.taskEndpointLink, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieApi.getJwt()
            }
        })
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

    putTask(task: Task, id: number): Promise<Task> {
        return fetch(this.taskEndpointLink + '/' + id, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
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