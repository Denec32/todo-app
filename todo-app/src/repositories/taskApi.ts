import type { Task } from '../types/Task';
import { cookieApi } from './cookieApi';

class TaskApi {
    taskEndpointLink: string = 'http://localhost:8080/task';

    async getTasks(): Promise<Task[]> {
        const result: Response = await fetch(this.taskEndpointLink, {
                 method: 'GET',
                 headers: {
                     'Accept': '*/*',
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + cookieApi.getJwt()
                 }
            });

        return await result.json() as Task[];
    }

    async addTask(newTask: Task): Promise<Task> {
        const result: Response = await fetch(this.taskEndpointLink, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieApi.getJwt()
            },
            body: JSON.stringify(newTask)
        });

        return await result.json() as Task;
    }

    async putTask(task: Task, id: number): Promise<Task> {
        const result: Response = await fetch(this.taskEndpointLink + '/' + id, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieApi.getJwt()
            },
            body: JSON.stringify(task)
        });
        
        return await result.json() as Task;
    }

    async deleteTask(id: number) {
        await fetch(this.taskEndpointLink + '/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieApi.getJwt()
            }
        });
    }

    async deleteTasks() {
        await fetch(this.taskEndpointLink, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieApi.getJwt()
            }
        });
    }
}

export const taskApi = new TaskApi();